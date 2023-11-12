import dbConnect from "@/lib/mongoose";
import HomepageDataModel from "@/models/homepageDataModel";
import tempBlogModel from "@/models/tempBlogModel";
import uBlogModel from "@/models/ublogModel";

export default async function userAPI(req, res) {
  try {
    await dbConnect();

    const bl = req.body.blog;
    delete bl.activationDetails;
    const blog = {
      ...bl,
      status: req.body.status,
      message: "",
      "activationDetails.activatedBy": req.body.adminName,
      "activationDetails.activatedDate": new Date(),
    };
    // console.log(blog);
    delete blog._id;
    // console.log(blog);
    const resu = await uBlogModel.findOneAndUpdate(
      { id: { $in: req.body.id } },
      blog,
      {
        upsert: true,
        new: true,
      }
    );
    // console.log(resu);
    const removed = await tempBlogModel.findOneAndRemove({
      id: { $in: req.body.id },
    });
    // console.log(resu);
    // if (resu.modifiedCount && resu.modifiedCount) {
    if (resu && resu._id) {
      if (req.body.status === "Active") {
        // adding blog to homepage recent
        const r = await HomepageDataModel.updateOne(
          {
            _id: "647a21933a89a8239f770931",
            "recent._id": { $nin: req.body.id },
          },
          {
            $push: {
              recent: {
                $each: [req.body.blog],
                $position: 0,
                $slice: 6,
              },
            },
          }
        );
        var querry = "categoryData." + req.body.blog.category + "_id";
        var quer = "categoryData." + req.body.blog.category;
        // adding blog to homepage category
        const s = await HomepageDataModel.updateOne(
          {
            _id: "647a21933a89a8239f770931",
            [querry]: { $nin: req.body.id },
          },
          {
            $push: {
              [quer]: {
                $each: [req.body.blog],
                $position: 0,
                $slice: 6,
              },
            },
          }
        );
        // console.log(s);
      }

      res.json({ status: 200, msg: "Activated Sucessfully", data: resu });
    } else {
      res.json({ status: 500, msg: "something went wrong" });
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: error.message });
  }
}
