import dbConnect from "@/lib/mongoose";
import jobModel from "@/models/jobModel";

export default async function userAPI(req, res) {
  try {
    await dbConnect();

    if (req.method === "POST") {
      const { page, perPage } = req.query;
      const pageNumber = parseInt(page) || 2;
      const itemsPerPage = parseInt(perPage) || 10;
      const resu = await jobModel
        .find({})
        .sort({ postingDate: "desc" })
        .skip((pageNumber - 1) * itemsPerPage)
        .limit(itemsPerPage);
      res.json({ status: 200, jobs: resu });
    }
  } catch (error) {
    // console.log(error);
    res.json({ status: 500, err: error });
  }
}
