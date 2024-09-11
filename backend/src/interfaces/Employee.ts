import { z } from "zod";

export const EmployeeSchema = z.object({
    last_name: z.string().min(1, "Surname is required"),
    first_name: z.string().min(1, "Firstname is required"),
    date_of_birth: z.coerce.date().refine(
        (date) => {
            const now = new Date();
            const minDate = new Date(1900, 0, 1);
            return date > minDate && date <= now;
        },
        {
            message:
                "The birth date must be a date between 1900-01-01 and today",
        }
    ),
    email: z.string().email("Email is not valid"),
});

export type Employee = z.infer<typeof EmployeeSchema>;
