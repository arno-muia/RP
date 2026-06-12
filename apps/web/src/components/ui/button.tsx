import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold tracking-wide transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  {
    variants: {
      variant: {
        primary: "btn-primary-gold px-6 py-3 text-white",
        secondary:
          "border border-primary/40 bg-transparent text-primary hover:bg-primary/8 px-6 py-3",
        alternate:
          "border border-ivory-25/80 bg-transparent text-ivory-25 hover:bg-ivory-25/10 px-6 py-3",
        ghost:
          "border border-white/30 bg-transparent text-white hover:bg-white/10 px-6 py-3",
        gold: "btn-primary-gold px-6 py-3",
        outline:
          "border border-border bg-card text-foreground hover:border-primary/40 hover:shadow-gold px-6 py-3",
        link: "bg-transparent text-primary px-0 hover:text-gold-600",
        small: "btn-primary-gold text-sm px-5 py-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
  href?: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  href,
  children,
  variant,
  className,
  external,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant }), className);

  if (href) {
    if (href.startsWith("#")) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export { buttonVariants };
