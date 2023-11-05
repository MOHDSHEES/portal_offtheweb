import dbConnect from "@/lib/mongoose";
import jobModel from "@/models/jobModel";

export default async function userAPI(req, res) {
  try {
    await dbConnect();

    if (req.method === "POST") {
      const resu = await jobModel
        .find({ status: "Inactive" })
        .sort({ postingDate: "desc" });
      res.json({ status: 200, jobs: resu });
    }
  } catch (error) {
    // console.log(error);
    res.json({ status: 500, err: error });
  }
}
