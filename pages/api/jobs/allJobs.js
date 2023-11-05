import dbConnect from "@/lib/mongoose";
import jobModel from "@/models/jobModel";

export default async function userAPI(req, res) {
  try {
    await dbConnect();

    if (req.method === "POST") {
      const { page, perPage, filter } = req.query;
      const pageNumber = parseInt(page) || 1;
      const itemsPerPage = parseInt(perPage) || 10;
      if (filter !== "all") {
        const resu = await jobModel
          .find({ status: filter })
          .sort({ postingDate: "desc" })
          .skip((pageNumber - 1) * itemsPerPage)
          .limit(itemsPerPage);
        res.json({ status: 200, jobs: resu });
      } else {
        const resu = await jobModel
          .find({})
          .sort({ postingDate: "desc" })
          .skip((pageNumber - 1) * itemsPerPage)
          .limit(itemsPerPage);
        res.json({ status: 200, jobs: resu });
      }
    }
  } catch (error) {
    // console.log(error);
    res.json({ status: 500, err: error });
  }
}
