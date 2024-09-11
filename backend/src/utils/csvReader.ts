import fs from "fs";
import { z } from "zod";
import { EmployeeSchema, Employee } from "../interfaces/Employee";
import { type ParseError } from "./types";

export function readAndParseCSV(filePath: string): {
    validEmployees: Employee[];
    errors: ParseError[];
} {
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const lines = fileContent.split("\n").slice(1);

    const validEmployees: Employee[] = [];
    const errors: ParseError[] = [];

    lines.forEach((line, index) => {
        // Ignore empty lines
        if (line.trim()) {
            try {
                // divide the line into an array of strings and remove whitespaces
                const [last_name, first_name, date_of_birth, email] = line
                    .split(",")
                    .map((s) => s.trim());

                //validate
                const employee = EmployeeSchema.parse({
                    last_name,
                    first_name,
                    date_of_birth,
                    email,
                });

                // if the employee is valid, add it to the list
                validEmployees.push(employee);
            } catch (error) {
                if (error instanceof z.ZodError) {
                    errors.push({ line: index + 2, error });
                } else {
                    console.error(
                        `Unexpected error on line ${index + 2}:`,
                        error
                    );
                }
            }
        }
    });

    return { validEmployees, errors };
}
