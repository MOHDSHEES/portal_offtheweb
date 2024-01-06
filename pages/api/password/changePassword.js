import { verifyPasswordToken } from "@/components/functions/jwt";
import dbConnect from "../../../lib/mongoose";
import employeeModel from "@/models/employeeModel";

export default async function userAPI(req, res) {
  try {
    await dbConnect();
    const token = req.body.token;
    const data = verifyPasswordToken(token);

    if (data.status === 200) {
      const update = await employeeModel.updateOne(
        { email: data.email },
        { password: req.body.password }
      );

      if (update.acknowledged && update.modifiedCount) {
        res.json({ status: 200, msg: "Password reset sucessfully" });
      } else {
        res.json({
          status: 500,
          msg: "Something went wrong. Try again later.",
        });
      }
    } else {
      res.json({ status: 501, msg: "Access forbidden. Token expired." });
    }
  } catch (error) {
    // console.log(error);
    res.send({ status: 500, msg: error.message });
  }
}
