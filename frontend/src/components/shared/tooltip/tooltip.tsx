import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

export function InfoTooltip({ description }: { description: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button>
            <InfoIcon size={13} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          {/* <h5 className="text-xl font-medi">
              {title}
            </h5> */}
          <p className="font-normal">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
