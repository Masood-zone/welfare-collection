import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function AdminHeader({
  title,
  description,
  className,
  buttons,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <div className={cn("flex items-center justify-between w-full", className)}>
      <div className="space-y-2">
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="text-base text-muted-foreground">{description}</p>
      </div>
      <div className="flex space-x-2">
        {buttons.map((button, index) => (
          <Button
            key={index}
            variant={button.variant || "default"}
            onClick={() => navigate(button.link, { replace: true })}
          >
            {button.title}
          </Button>
        ))}
      </div>
    </div>
  );
}
