import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePayRemaining } from "../../services/payments/queries";
import { useUserStore } from "@/store/use-user.store";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

interface EditPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  remainingAmount: string | number;
  paymentId: string;
}

export function EditPaymentModal({
  isOpen,
  onClose,
  remainingAmount,
  paymentId,
}: EditPaymentModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { amount: remainingAmount },
  });

  const { user } = useUserStore();
  const userId = user?.id;
  const { mutateAsync: updatePayment, isPending } = usePayRemaining(
    userId || ""
  );

  const handleEditSubmit = async (values: { amount: string | number }) => {
    try {
      await updatePayment({
        id: paymentId,
        amount: Number.parseFloat(values.amount.toString()),
      });
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Payment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleEditSubmit)} className="space-y-3">
          <Label htmlFor="remaining-amount" className="text-right ">
            Remaining Amount
          </Label>
          <Input
            id="remaining-amount"
            className="col-span-3"
            {...register("amount", {
              required: true,
              validate: (value) =>
                Number(value) <= Number(remainingAmount) ||
                "Amount cannot exceed remaining amount",
            })}
            type="number"
          />
          {errors.amount && (
            <span className="text-red-500">{errors.amount.message}</span>
          )}
          <DialogFooter>
            <Button type="submit">
              {isPending ? (
                <span className="animate-spin">
                  <Loader2 className="h-5 w-5" />
                </span>
              ) : (
                `Pay Remaining`
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
