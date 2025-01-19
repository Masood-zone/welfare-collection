import * as React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CustomButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    { className, isLoading = false, icon, children, disabled, ...props },
    ref
  ) => {
    return (
      <Button
        className={cn("flex items-center gap-2", className)}
        disabled={isLoading || disabled}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          icon && <span className="h-4 w-4">{icon}</span>
        )}
        {children}
      </Button>
    );
  }
);
CustomButton.displayName = "CustomButton";

export { CustomButton };
