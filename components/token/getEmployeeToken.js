import jwt from "jsonwebtoken";

export default function getEmployeeToken(user) {
  return jwt.sign(
    {
      email: user.email,
      post: user.post,
      joiningDate: user.joiningDate,
      jobType: user.jobType,
      adminLevel: user.adminLevel,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "864000s",
    }
  );
}
