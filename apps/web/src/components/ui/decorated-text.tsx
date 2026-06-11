import { cn } from "@/lib/cn";

export function DecoratedText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-serif italic font-normal text-stone-800",
        className,
      )}
    >
      {children}
    </span>
  );
}
