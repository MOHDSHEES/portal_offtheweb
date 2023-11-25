import dbConnect from "@/lib/mongoose";
import employeeModel from "@/models/employeeModel";

export default async function userAPI(req, res) {
  try {
    await dbConnect();
    const resu = await employeeModel.findOneAndUpdate(
      { email: req.body.email, "tasks.taskNo": req.body.taskNo },
      { $set: { "tasks.$.task": req.body.newTask } },
      {
        new: true,
      }
    );
    if (resu)
      res.json({
        status: 200,
        msg: "Task updated successfully",
        data: resu,
      });
    else
      res.json({ status: 500, msg: "Something went wrong, Try again later" });
  } catch (error) {
    // console.log(error);
    res.json({ status: 500, msg: error });
  }
}
