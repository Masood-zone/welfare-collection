import { z } from "zod";

export const formSchema = z.object({
  welfareProgramId: z.string(),
  paymentMode: z.enum(["CASH", "CARD", "MOMO"]),
  amount: z.coerce.number().min(1).max(100000),
});
