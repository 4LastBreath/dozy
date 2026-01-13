
const Footer = () => {

  const currentYear = new Date().getFullYear()

  return (
<footer className='bg-neutral-300 dark:bg-card w-full h-[34px] flex items-center justify-center'>
  <p className='text-sm text-neutral-700 dark:text-neutral-400'>
    Made with love by 
    <a href='https://bf-dev.space/' target="_blank" className='hover:text-primary'> Brian Fritz </a>
    , {currentYear}&copy;
  </p>
</footer>
  );
};

export default Footer;