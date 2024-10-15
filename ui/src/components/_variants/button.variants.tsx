import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export default cva(
  cn(
    "inline-flex items-center justify-center text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    "whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50",
    "transition-all duration-300"
  ),
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white hover:shadow-lg hover:shadow-cyan-500/50",
        ghost: "text-gray-400 hover:text-white hover:bg-muted-dark",
        secondary: "bg-secondary text-black hover:bg-secondary-dark",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-gray-200 text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-12 px-6",
      },
      shape: {
        squared: "rounded-none",
        rounded: "rounded-md",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "rounded",
    },
  }
);
