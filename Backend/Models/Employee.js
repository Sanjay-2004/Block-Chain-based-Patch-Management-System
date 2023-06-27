import mongoose from "mongoose";
const EmployeeSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const Employee = mongoose.model("Employees", EmployeeSchema, "Employees");

export default Employee;
