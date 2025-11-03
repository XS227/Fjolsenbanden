import * as React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const baseClasses =
  "fj-button fj-ring-offset inline-flex items-center justify-center gap-2 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";

const variantClasses = {
  default:
    "fj-button-primary bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] text-white shadow-[0_16px_32px_rgba(19,160,249,0.35)] hover:from-[#0d8bd6] hover:to-[#e12585] focus-visible:ring-[#13A0F9] focus-visible:ring-offset-[#050b24]",
  outline:
    "fj-button-outline border border-white/20 bg-white/10 text-white hover:border-white/35 hover:bg-white/15 focus-visible:ring-[#13A0F9] focus-visible:ring-offset-[#050b24]",
};

const sizeClasses = {
  default: "h-10 rounded-xl px-4 text-sm",
  sm: "h-9 rounded-lg px-3 text-sm",
  lg: "h-11 rounded-2xl px-6 text-base",
};

export const Button = React.forwardRef(
  (
    {
      asChild = false,
      className,
      variant = "default",
      size = "default",
      type,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref,
        ...props,
        className: cn(classes, children.props.className),
      });
    }

    return React.createElement(
      "button",
      {
        ref,
        type: type ?? "button",
        className: classes,
        ...props,
      },
      children,
    );
  },
);

Button.displayName = "Button";
