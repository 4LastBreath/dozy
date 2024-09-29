import React, { PropsWithChildren } from "react";
import Logo from "../logo/logo";
import Title from "./title";

interface CardProps {
  title: string,
  children: React.ReactNode,
  withLogo?: boolean,
}

export const ContentCard = ({ title, children, withLogo = true } : CardProps) => {
  return (
<div className='w-full max-w-md py-8 sm:px-6 sm:shadow-xl rounded-xl mx-auto sm:border sm:bg-surface bg-transparent px-2'>

      <div className='flex gap-4 justify-center w-full mb-6'>
        {withLogo && <Logo />}
        <Title>{title}</Title>
      </div>

      {children}

</div>
  );
};

export const ContentCardParagraph = ({children} : PropsWithChildren) => {
  return (
    <p className='max-w-[60ch] text-pretty text-neutral-600 dark:text-neutral-300 text-center mb-5 text-sm'>{children}</p>
  )
}