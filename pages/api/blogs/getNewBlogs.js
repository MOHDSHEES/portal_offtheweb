import dbConnect from "@/lib/mongoose";
import tempBlogModel from "@/models/tempBlogModel";

export default async function userAPI(req, res) {
  try {
    await dbConnect();

    if (req.method === "POST") {
      const resu = await tempBlogModel.find({ status: "Inactive" });
      // .sort({ postingDate: "desc" });
      res.json({ status: 200, blogs: resu });
    }
  } catch (error) {
    // console.log(error);
    res.json({ status: 500, err: error });
  }
}
