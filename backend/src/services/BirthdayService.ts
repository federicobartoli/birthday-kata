import { DateTime } from "luxon";
import { EmployeeService } from "./EmployeeService";
import { EmailService } from "./EmailService";

export class BirthdayService {
    constructor(
        private employeeService: EmployeeService,
        private emailService: EmailService
    ) {}

    sendGreetings(today: DateTime): void {
        const employeesWithBirthday =
            this.employeeService.findEmployeesWithBirthdayOn(today);

        for (const employee of employeesWithBirthday) {
            const subject = "Happy Birthday!";
            const body = `Happy Birthday, dear ${employee.first_name}!`;

            this.emailService.sendEmail(employee.email, subject, body);
        }
    }
}
