import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type ?? "text"}
      className={cn(
        "h-10 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 shadow-sm transition focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";
