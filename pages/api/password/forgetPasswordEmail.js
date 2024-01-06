import getEmployeeToken from "@/components/token/getEmployeeToken";
import dbConnect from "../../../lib/mongoose";
import employeeModel from "@/models/employeeModel";
import sgMail from "@sendgrid/mail";
import forgetPasswordTemplate from "@/components/token/forgetPasswordTemplate";
import { getPasswordToken } from "@/components/functions/jwt";

export default async function userAPI(req, res) {
  try {
    await dbConnect();
    const email = req.body.email;
    const token = getPasswordToken(email);
    // console.log(token);
    // console.log(data);
    // contact us email
    const userDetails = await employeeModel.findOne(
      { email: email },
      { email: 1, password: 1 }
    );
    if (userDetails) {
      // res.send(userDetails._doc);
      // const data = req.body.state;
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: email, // Change to your recipient
        from: { email: "official.offtheweb@gmail.com", name: "OFFTHEWEB" }, // Change to your verified sender
        subject: "OFFTHEWEB PASSWORD",
        html: forgetPasswordTemplate(token),
      };
      sgMail
        .send(msg)
        .then(() => {
          res.send({
            success: true,
            message: "Password reset link has been Sent to Registered Email.",
          });
        })
        .catch((error) => {
          res.send({
            status: 500,
            success: false,
            message: "Something went wrong. Try again later",
          });
        });
    } else {
      res.send({ status: 500, message: "Incorrect Email" });
    }
  } catch (error) {
    res.json({ success: false, message: error });
  }
}
