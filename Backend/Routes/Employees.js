import express from "express";
const router = express.Router();
import nodemailer from "nodemailer";
import { Employee, validate } from "../Models/Employee.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  service: process.env.SERVICE,
  port: 587,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const sendEmail = async (email, subject, text) => {
  try {
    const mailing = {
      from: '"Admin1" <admin@company.com>',
      to: email,
      subject: subject,
      html: `<p>${text}</p><p>Visit <a href="http://localhost:5173/reporter">google.com</a> for more information.</p>`,
    };

    transporter.sendMail(mailing, (error, info) => {
      if (error) console.log("Error sending mail: ", error);
      else console.log("Email sent: ", info.response);
    });
  } catch (error) {
    console.log("Error sending mail: ", error);
  }
};

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const employee = await Employee.findOne({ email: req.body.email });
    if (employee)
      return res
        .status(409)
        .send({ message: "Employee with given email already exists" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newEmployee = await new Employee({
      ...req.body,
      password: hashPassword,
    }).save();
    if (newEmployee) {
      const subject = "WELCOME TO OUR COMPANY";
      const text = `This is your password: ${req.body.password}`;

      sendEmail(req.body.email, subject, text);

      console.log("Creation Successful");
      res.sendStatus(200);
    } else {
      console.log("Error");
      res.sendStatus(500);
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
