import { z } from "zod";

export type ParseError = {
    line: number;
    error: z.ZodError;
};
