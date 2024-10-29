import { PropsWithChildren } from "react";
import Header from "./header";
import { useState } from "react";
import DrawerDisplay from "./drawer";

const Layout = ({children} : PropsWithChildren) => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
  <>
    <Header setIsDrawerOpen={setIsDrawerOpen} />
    <main className="h-full w-full">
      <div className="flex py-10 px-2 min-h-[calc(100svh-theme(height.header))] h-full w-full max-w-[1440px] mx-auto sm:py-16 sm:px-6">
        <div className="relative min-h-full w-full">
          {children}
        </div>
      </div>
    </main>
    <DrawerDisplay isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}/>
  </>
  );
};

export default Layout;