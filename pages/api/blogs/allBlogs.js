import dbConnect from "@/lib/mongoose";
import tempBlogModel from "@/models/tempBlogModel";
import uBlogModel from "@/models/ublogModel";

export default async function userAPI(req, res) {
  try {
    await dbConnect();

    if (req.method === "POST") {
      const { page, perPage, filter } = req.query;
      const pageNumber = parseInt(page) || 1;
      const itemsPerPage = parseInt(perPage) || 15;
      //   let re = null;
      const re = await tempBlogModel.find({});
      if (pageNumber === 1) {
      }
      if (filter !== "all") {
        const tempBlogIds = re.map((blog) => blog.id);

        const resu = await uBlogModel
          .find({ id: { $nin: tempBlogIds }, status: filter })
          .skip((pageNumber - 1) * itemsPerPage)
          .limit(itemsPerPage);
        // const blogs = await UBlogs.find({});
        if (pageNumber === 1) {
          const filterdata = re.filter((blog) => blog.status === filter);
          res.json({ status: 200, blogs: [...filterdata, ...resu] });
        } else res.json({ status: 200, blogs: resu });
      } else {
        // const re = await tempBlogModel.find({});
        const tempBlogIds = re.map((blog) => blog.id);

        const resu = await uBlogModel
          .find({ id: { $nin: tempBlogIds } })
          .skip((pageNumber - 1) * itemsPerPage)
          .limit(itemsPerPage);
        // const blogs = await UBlogs.find({});
        if (pageNumber === 1)
          res.json({ status: 200, blogs: [...re, ...resu] });
        else res.json({ status: 200, blogs: resu });
      }

      //   const re = await tempBlogModel.find({});
      //   const tempBlogIds = re.map((blog) => blog.id);
      //   const resu = await uBlogModel.find({ id: { $nin: tempBlogIds } });
      //   // const blogs = await UBlogs.find({});
      //   res.json({ status: 200, blogs: [...re, ...resu] });
    }
  } catch (error) {
    // console.log(error);
    res.json({ status: 500, err: error });
  }
}
