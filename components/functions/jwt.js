import jwt from "jsonwebtoken";

const getPasswordToken = (email) => {
  return jwt.sign({ email: email }, process.env.JWT_PASSWORD_SECRET, {
    expiresIn: "300s",
  });
};

// verify token for password reset link
const verifyPasswordToken = (token) => {
  try {
    var decoded = jwt.verify(token, process.env.JWT_PASSWORD_SECRET, {
      algorithm: "RS256",
    });

    if (decoded.email) {
      // res.locals.email = decoded.email;
      // next();
      return { status: 200, email: decoded.email };
    } else {
      return { status: 404, msg: "Access forbidden" };
    }
  } catch (error) {
    return { status: 404, msg: "Access forbidden" };
  }
};

export { getPasswordToken, verifyPasswordToken };
