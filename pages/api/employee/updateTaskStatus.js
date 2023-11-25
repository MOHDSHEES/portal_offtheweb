import dbConnect from "@/lib/mongoose";
import employeeModel from "@/models/employeeModel";

export default async function userAPI(req, res) {
  try {
    await dbConnect();

    const status = req.body.status;
    const taskNo = req.body.taskNo;
    let resu;
    if (status === 0) {
      resu = await employeeModel.findOneAndUpdate(
        {
          email: req.body.email,
          "tasks.taskNo": taskNo,
        },
        {
          $set: {
            "tasks.$.status": status,
          },
        }
      );
    } else {
      resu = await employeeModel.findOneAndUpdate(
        {
          email: req.body.email,
          "tasks.taskNo": taskNo,
        },
        {
          $set: {
            "tasks.$.status": status,
            "tasks.$.completedAt": new Date(),
          },
        }
      );
    }
    // console.log(resu);
    if (resu)
      res.json({
        status: 200,
        msg: "Successfully updated",
        data: resu,
      });
    else
      res.json({ status: 500, msg: "Something went wrong, Try again later" });
    // console.log(user);
    // let trending = resu.map((a) => a.title);
    // console.log(resu);
  } catch (error) {
    // console.log(error);
    res.json({ status: 500, msg: error });
  }
}
