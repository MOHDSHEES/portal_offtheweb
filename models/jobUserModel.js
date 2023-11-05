import mongoose from "mongoose";
const jobUserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true },
  address: { type: String, required: true },
  jobs: [{}],
});

// productsSchema.index({ name: "text", category: "text" });
const jobUserModel =
  mongoose.models.JobUsers || mongoose.model("JobUsers", jobUserSchema);
// module.exports =  employeeModel;
export default jobUserModel;
