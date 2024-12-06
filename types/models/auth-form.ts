import { z } from "zod";

export const AuthFormSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid email"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(8, {
        message: "Password must be at least 8 characters"
    }).max(20, {
        message: "Password must be at most 20 characters"
    })
})
export const AuthFormSchemaRegister = AuthFormSchema.extend({
    name: z.string().min(1), // en registro, nombre es obligatorio
  });

export type AuthFormType = z.infer<typeof AuthFormSchema>