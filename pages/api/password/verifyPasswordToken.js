import { verifyPasswordToken } from "@/components/functions/jwt";
import dbConnect from "../../../lib/mongoose";
import employeeModel from "@/models/employeeModel";

export default async function userAPI(req, res) {
  try {
    const token = req.body.token;
    const data = verifyPasswordToken(token);
    if (data.status === 200) {
      res.json({ status: 200, email: data.email });
    } else res.json({ status: 500, msg: data.msg });
  } catch (error) {
    res.send({ status: 500, msg: error.message });
  }
}
