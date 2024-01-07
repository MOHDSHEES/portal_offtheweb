import dbConnect from "@/lib/mongoose";
import employeeModel from "@/models/employeeModel";
import cloudinary from "cloudinary";

const cloud = cloudinary.v2;

cloud.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function userAPI(req, res) {
  try {
    // console.log("in");
    let preImg = req.body.imgId;
    await dbConnect();
    if (preImg) {
      const url = preImg.split("/").slice(-2);
      const imgId = url[0] + "/" + url[1].split(".")[0];
      //   console.log(imgId);
      cloud.uploader.destroy(imgId, function (error, result) {
        // console.log(result, error);
      });
    }
    try {
      // console.log(res.locals.data._id);
      const resu = await employeeModel.updateOne(
        {
          email: req.body.data.email,
        },
        { profileImg: req.body.profileImg }
      );
      // console.log(resu);
      if (resu.acknowledged && resu.modifiedCount)
        res.json({
          status: 200,
          msg: "Updated Successfully",
          details: req.body.data,
        });
      else if (resu.acknowledged && !resu.modifiedCount)
        res.json({ status: 200, msg: "Already Updated" });
      else
        res.json({ status: 500, msg: "Something went wrong, Try again later" });
    } catch (error) {
      // console.log(error);
      res.send({ status: 500, msg: error.message });
    }
  } catch (error) {
    // console.log(error);
    res.json({ error });
  }
}
