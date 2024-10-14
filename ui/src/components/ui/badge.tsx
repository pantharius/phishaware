import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import badgeVariants from "@/components/_variants/badge.variants";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, shape, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size, shape }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
