import { type ParseError } from "./types";

export function formatErrors(errors: ParseError[]): string[] {
    return errors.map(({ line, error }) => {
        const errorMessages = error.errors.map(
            (e) => `${e.path.join(".")}: ${e.message}`
        );
        return `Line ${line}: ${errorMessages.join(", ")}`;
    });
}

export function logErrors(errors: ParseError[]): void {
    const formattedErrors = formatErrors(errors);
    console.log("Errors found in the CSV file:");
    formattedErrors.forEach((error) => console.log(error));
}
