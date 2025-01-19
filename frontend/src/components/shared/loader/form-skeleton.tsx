import { Skeleton } from "@/components/ui/skeleton";

export function FormSkeleton() {
  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header Skeletons */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-48" /> {/* Title */}
        <Skeleton className="h-5 w-64" /> {/* Subtitle */}
      </div>

      {/* Form Fields Skeletons */}
      <div className="space-y-6">
        {/* Member Name Field */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" /> {/* Label */}
          <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
          <Skeleton className="h-4 w-48" /> {/* Helper text */}
        </div>
        {/* Member Email Field */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" /> {/* Label */}
          <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
          <Skeleton className="h-4 w-48" /> {/* Helper text */}
        </div>
        {/* Phone Number Field */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" /> {/* Label */}
          <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
          <Skeleton className="h-4 w-48" /> {/* Helper text */}
        </div>
        {/* Button */}
        <Skeleton className="h-10 w-32 rounded-md bg-primary/20" />{" "}
        {/* Save Button */}
      </div>
    </div>
  );
}
