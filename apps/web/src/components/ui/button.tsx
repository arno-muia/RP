import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "alternate" | "link" | "small";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-stone-900 text-white hover:bg-stone-800 border border-stone-900",
  alternate:
    "bg-transparent text-white border border-white/80 hover:bg-white hover:text-stone-900",
  link: "bg-transparent text-stone-900 border-0 px-0 hover:opacity-70",
  small: "bg-stone-900 text-white hover:bg-stone-800 text-sm px-5 py-2.5",
};

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors",
    variants[variant],
    className,
  );

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
