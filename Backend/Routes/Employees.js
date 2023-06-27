import express from "express";
const router = express.Router();
import Employee from "../Models/Employee.js";

router.post("/", async (req, res) => {
  try {
    const employee = await Employee.findOne({ email: req.body.email });
    if (employee)
      return res
        .status(409)
        .send({ message: "Employee with given email already exists" });

    const newEmployee = await Employee.create(req.body);
    if (newEmployee) {
      console.log("Creation Successful");
      res.sendStatus(200);
    } else {
      console.log("Error");
      res.sendStatus(500);
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
