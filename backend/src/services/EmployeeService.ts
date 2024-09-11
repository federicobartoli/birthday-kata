import { DateTime } from "luxon";
import { Employee } from "../interfaces/Employee";
import { readAndParseCSV } from "../utils/csvReader";
import { type ParseError } from "../utils/types";

export class EmployeeService {
    private employees: Employee[];
    private errors: ParseError[];

    constructor(csvPath: string) {
        const { validEmployees, errors } = readAndParseCSV(csvPath);
        this.employees = validEmployees;
        this.errors = errors;

        if (this.errors.length > 0) {
            console.warn(
                `Found ${this.errors.length} errors while parsing the CSV file.`
            );
        }
    }

    findEmployeesWithBirthdayOn(date: DateTime): Employee[] {
        const employeesForDate = this.findEmployeesBornOn(date);

        if (date.month === 2 && date.day === 28 && !date.isInLeapYear) {
            console.log(
                "Today is February 28th, checking for employees born on February 29th..."
            );
            const feb29 = DateTime.local(2020, 2, 29); // 2020 is a leap year
            const feb29Employees = this.findEmployeesBornOn(feb29);
            console.log(
                `Found ${feb29Employees.length} employees born on February 29th.`
            );
            return [...employeesForDate, ...feb29Employees];
        }

        return employeesForDate;
    }

    private findEmployeesBornOn(date: DateTime): Employee[] {
        console.log(date.toISO(), "date");
        return this.employees.filter((employee) => {
            console.log(`Checking employee: ${employee.first_name}`);
            const birthDate = DateTime.fromJSDate(
                employee.date_of_birth
            ).setZone(date.zone);
            console.log(birthDate.toISO(), "birthDate");
            console.log(`Employee's birthday: ${birthDate.toFormat("MM/dd")}`);

            const isSameMonthDay =
                birthDate.month === date.month && birthDate.day === date.day;

            console.log(`Is birthday match? ${isSameMonthDay}`);

            return isSameMonthDay;
        });
    }

    getErrors(): ParseError[] {
        return this.errors;
    }
}
