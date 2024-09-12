import { PropsWithChildren } from "react";
import Header from "./header";

const Layout = ({children} : PropsWithChildren) => {
  return (
  <>
    <Header />
    <main className="mt-header py-6 px-4 min-h-full h-[calc(100svh-theme(height.header))] w-full md:py-16 md:px-6">
      {children}
    </main>
  </>
  );
};

export default Layout;