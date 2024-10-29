import Logo from "./logo";

const LogoLoading = () => {
  return (
<div className='w-fit h-fit flex flex-col gap-2 items-center justify-center animate-logo-loading'>
  <Logo />
  <p className='text-primary font-semibold'>Loading...</p>
</div>
  );
};

export default LogoLoading;