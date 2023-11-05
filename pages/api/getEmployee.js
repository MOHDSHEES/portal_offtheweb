import dbConnect from "../../lib/mongoose";
import employeeModel from "@/models/employeeModel";

export default async function userAPI(req, res) {
  try {
    await dbConnect();

    if (req.method === "POST") {
      const resu = await employeeModel.findOne(
        { email: req.body.email },
        { password: 0 }
      );
      if (resu) {
        res.json(resu);
      }
    } else {
      throw new Error(`Unsupported HTTP method: ${req.method}`);
    }
  } catch (error) {
    // console.log(error);
    res.json({ error });
  }
}
