import dbConnect from "@/lib/mongoose";
import jobModel from "@/models/jobModel";

export default async function userAPI(req, res) {
  try {
    await dbConnect();
    const { action } = req.query;
    if (req.method === "POST") {
      let resu;
      if (action === "Rejected") {
        resu = await jobModel.findOneAndUpdate(
          { _id: req.body.id },
          { status: action, message: req.body.message },
          { new: true }
        );
      } else {
        resu = await jobModel.findOneAndUpdate(
          { _id: req.body.id },
          { status: action, message: "" },
          { new: true }
        );
      }
      if (resu) res.json({ status: 200, data: resu });
      else
        res.json({ status: 500, err: "Something went wrong, Try again later" });
    } else {
      res.json({ status: 500, err: "Not Suported" });
    }
  } catch (error) {
    res.json({ status: 500, err: error });
  }
}
