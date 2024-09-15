import { PropsWithChildren } from "react";
import Header from "./header";

const Layout = ({children} : PropsWithChildren) => {
  return (
  <>
    <Header />
    <main className="mt-header h-full w-full">
      <div className="flex py-10 px-4 min-h-[calc(100svh-theme(height.header))] h-full w-full max-w-[1440px] mx-auto sm:py-16 sm:px-6">
        <div className="relative min-h-full w-full">
          {children}
        </div>
      </div>
    </main>
  </>
  );
};

export default Layout;