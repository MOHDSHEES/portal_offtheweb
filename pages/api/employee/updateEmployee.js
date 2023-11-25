import dbConnect from "@/lib/mongoose";
import employeeModel from "@/models/employeeModel";

export default async function userAPI(req, res) {
  try {
    await dbConnect();
    const employee = await employeeModel.findOneAndUpdate(
      { _id: req.body.id },
      req.body.data,
      { new: true }
    );
    res.json({ status: 200, data: employee });
  } catch (error) {
    // console.log(error);
    res.json({ status: 500, msg: error });
  }
}
