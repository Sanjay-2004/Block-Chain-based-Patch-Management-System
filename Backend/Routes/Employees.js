import express from "express";
const router = express.Router();
import nodemailer from "nodemailer";
import Employee from "../Models/Employee.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  secure: true,
  auth: {
    user: "sj18apr.04@gmail.com",
    pass: "phxnzzpwbsmvxonp",
  },
});

const sendEmail = async (email, subject, text) => {
  try {
    const mailing = {
      from: '"Admin1" <admin@company.com>',
      to: email,
      subject: subject,
      html: `<p>${text}</p>`,
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
    const employee = await Employee.findOne({ email: req.body.email });
    if (employee)
      return res
        .status(409)
        .send({ message: "Employee with given email already exists" });

    const newEmployee = await Employee.create(req.body);
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
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
