import { cva } from "class-variance-authority";

export default cva(
  "inline-flex items-center px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-dark",
        ghost: "text-gray-400 hover:text-white hover:bg-muted-dark",
        secondary: "bg-secondary text-black hover:bg-secondary-dark",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-gray-200 text-white",
        success: "bg-green-600 text-white hover:bg-green-700",
        warning: "bg-orange-600 text-white hover:bg-orange-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-5 px-2",
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
