import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
  {
    variants: {
      variant: {
        primary: "bg-burgundy text-white hover:bg-burgundy-light px-6 py-3",
        secondary: "border-2 border-gold text-gold hover:bg-gold hover:text-white px-6 py-3",
        alternate: "border border-white/80 bg-transparent text-white hover:bg-white hover:text-burgundy px-6 py-3",
        ghost: "border border-white/30 bg-transparent text-white hover:bg-white/10 px-6 py-3",
        gold: "bg-gold text-white hover:bg-gold-light px-6 py-3",
        link: "bg-transparent text-burgundy px-0 hover:text-burgundy-light",
        small: "bg-burgundy text-white hover:bg-burgundy-light text-sm px-5 py-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export function Button({
  href,
  children,
  variant,
  className,
  external,
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant }), className);

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

export { buttonVariants };
