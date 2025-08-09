import {z} from "zod"

export const companySchema = z.object({
  name: z.string().min(1, "Name is required"),
  fis: z.string().min(1, "FIS is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(10, "Must be at least 10 digits"),
  isRegular: z.boolean(),
  abr:z.string().min(2)
})

export type CompanyForm = z.infer<typeof companySchema>