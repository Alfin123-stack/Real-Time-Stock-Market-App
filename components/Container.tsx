// components/Container.tsx
import React from "react";
import clsx from "clsx";

export default function Container({
  children,
  fluid = false,
  className,
}: {
  children: React.ReactNode;
  fluid?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(fluid ? "w-full" : "max-w-7xl mx-auto px-6", className)}>
      {children}
    </div>
  );
}
