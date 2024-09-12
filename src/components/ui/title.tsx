import React from "react";
import { cn } from "@/lib/utils";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const Title = ({children, className, ...props}: TitleProps) => {
  return (
<h1 className={cn('text-primary text-2xl font-semibold flex items-center', className)} {...props}>
  {children}
</h1>
  );
};

export default Title;