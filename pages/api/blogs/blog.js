import dbConnect from "@/lib/mongoose";
import uBlogModel from "@/models/ublogModel";

export default async function userAPI(req, res) {
  try {
    await dbConnect();
    // console.log(req.body.id);
    if (req.method === "POST") {
      const resu = await uBlogModel.findOne({ id: req.body.id });
      // .sort({ postingDate: "desc" });
      res.json({ status: 200, blog: resu });
    }
  } catch (error) {
    // console.log(error);
    res.json({ status: 500, err: error });
  }
}
