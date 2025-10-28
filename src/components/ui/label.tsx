import * as React from "react";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-sm font-medium text-zinc-700", className)}
    {...props}
  />
));

Label.displayName = "Label";
