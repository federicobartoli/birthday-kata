import express from "express";
import { DateTime } from "luxon";
import { EmployeeService } from "./services/EmployeeService";
import { BirthdayService } from "./services/BirthdayService";
import { EmailService } from "./services/EmailService";

const app = express();
const port = 8000;
const csvPath = "src/data/employees.csv";

const employeeService = new EmployeeService(csvPath);
const emailService = new EmailService();
const birthdayService = new BirthdayService(employeeService, emailService);

app.get("/", (_, res) => {
    const today = DateTime.local();
    birthdayService.sendGreetings(today);
    res.send("Birthday greetings sent!");
});

app.get("/errors", (_, res) => {
    const errors = employeeService.getErrors();
    res.json(errors);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
