import getEmployeeToken from "@/components/token/getEmployeeToken";
import dbConnect from "../../lib/mongoose";
import employeeModel from "@/models/employeeModel";
import sgMail from "@sendgrid/mail";
import registerEmployee from "@/components/token/employeeEmailTemplate";

export default async function userAPI(req, res) {
  try {
    // await dbConnect();

    const data = req.body.state;
    const token = getEmployeeToken(data);
    // console.log(token);
    // console.log(data);
    // contact us email
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: data.email, // Change to your recipient
      from: { email: "official.offtheweb@gmail.com", name: "OFFTHEWEB" }, // Change to your verified sender
      subject: "Register",
      html: registerEmployee(data, token),
    };
    sgMail
      .send(msg)
      .then(() => {
        res.send({
          success: true,
          message:
            "Registration Email has been sent to the Employee/Intern succesfully",
        });
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).send({
          success: false,
          message: "Something went wrong. Try again later",
        });
      });
  } catch (error) {
    // console.log(error);
    res.json({ success: false, message: error });
  }
}
