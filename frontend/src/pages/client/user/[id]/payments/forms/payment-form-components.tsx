import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./form-schema";
import { InfoTooltip } from "@/components/shared/tooltip/tooltip";

export const WelfareProgramSelect = ({
  control,
  welfarePrograms,
  isLoading,
}: {
  control: Control<z.infer<typeof formSchema>>;
  welfarePrograms: Enrollments[];
  isLoading: boolean;
}) => (
  <FormField
    control={control}
    name="welfareProgramId"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Welfare Program</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a welfare program" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {isLoading ? (
              <SelectItem value="loading">Loading...</SelectItem>
            ) : (
              welfarePrograms
                ?.filter(
                  (program: Enrollments) => program.status === "APPROVED"
                )
                ?.map((program: Enrollments) => (
                  <SelectItem
                    key={program.welfareProgramId}
                    value={program.welfareProgramId}
                  >
                    {program.welfareProgram.name}
                  </SelectItem>
                ))
            )}
          </SelectContent>
        </Select>
        <FormDescription>
          This shows the welfare programs which have been approved.
          <InfoTooltip description="Select a welfare program" />
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const PaymentModeSelect = ({
  control,
}: {
  control: Control<z.infer<typeof formSchema>>;
}) => (
  <FormField
    control={control}
    name="paymentMode"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Payment Mode</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a valid payment mode" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="CASH">CASH</SelectItem>
            <SelectItem value="CARD">CARD</SelectItem>
            <SelectItem value="MOMO">Mobile Money</SelectItem>
          </SelectContent>
        </Select>
        <FormDescription>
          You can select any of these payment modes.
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const AmountInput = ({
  control,
}: {
  control: Control<z.infer<typeof formSchema>>;
}) => (
  <FormField
    control={control}
    name="amount"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Amount</FormLabel>
        <FormControl>
          <Input placeholder="Enter an amount" type="number" {...field} />
        </FormControl>
        <FormDescription>This is amount you are to pay</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);
