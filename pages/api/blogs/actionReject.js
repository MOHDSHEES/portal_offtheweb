import dbConnect from "@/lib/mongoose";
import HomepageDataModel from "@/models/homepageDataModel";
import tempBlogModel from "@/models/tempBlogModel";
import uBlogModel from "@/models/ublogModel";

export default async function userAPI(req, res) {
  try {
    await dbConnect();
    const blog = {
      status: "Rejected",
      message: req.body.message,
      "activationDetails.activatedBy": req.body.adminName,
      "activationDetails.activatedDate": new Date(),
    };
    // console.log(blog);
    delete blog._id;
    // console.log(blog);
    let resu;
    if (req.body.blog.status === "Active") {
      resu = await uBlogModel.findOneAndUpdate({ id: req.body.id }, blog, {
        upsert: true,
        new: true,
      });
    } else {
      resu = await tempBlogModel.findOneAndUpdate({ id: req.body.id }, blog, {
        upsert: true,
        new: true,
      });
    }
    // console.log(resu);
    // const removed = await tempBlogModel.findOneAndRemove({
    //   id: { $in: req.body.id },
    // });

    // pull blog from homepage recent
    const st = await HomepageDataModel.updateOne(
      {
        _id: "647a21933a89a8239f770931",
      },
      {
        $pull: {
          recent: {
            id: req.body.id,
          },
        },
      }
    );

    const query = "categoryData." + req.body.blog.category;
    // pull blog from homepage category
    const s = await HomepageDataModel.updateOne(
      {
        _id: "647a21933a89a8239f770931",
      },
      {
        $pull: {
          [query]: {
            id: req.body.id,
          },
        },
      }
    );

    if (resu) {
      res.json({ status: 200, msg: "Rejected Sucessfully", data: resu });
    } else {
      res.json({ status: 500, msg: "something went wrong" });
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: error.message });
  }
}
