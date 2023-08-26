import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "src/utils/shadcn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-stone-950 focus-visible:ring-stone-300",
  {
    variants: {
      variant: {
        default: "bg-stone-900 text-stone-50 hover:bg-stone-50",
        destructive:
          "bg-red-500 text-stone-50 hover:bg-red-500/90 bg-red-900 text-stone-50 hover:bg-red-900/90",
        outline:
          "border border-stone-400 bg-stone-800 text-stone-100 hover:bg-stone-700",
        secondary:
          "bg-stone-100 text-stone-900 hover:bg-stone-100/80 bg-stone-800 text-stone-50 hover:bg-stone-800/80",
        ghost: "hover:bg-stone-800 hover:text-stone-50",
        link: "text-stone-900 underline-offset-4 hover:underline text-stone-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };