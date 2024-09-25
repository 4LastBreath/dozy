import { NavLink } from "react-router-dom";
import { navLinks } from "@/utils/navLinks";

const DrawerNav = () => {
  return (
<nav className="flex flex-col w-full" role='navigation' aria-label='primary'>
  {navLinks.map(link => (
    <NavLink to={link.path} key={link.name}
    className={({ isActive }) =>
      `
        relative font-medium px-2 py-4 hover:bg-neutral-300/70 dark:hover:bg-neutral-900/50
      ${isActive
        ? "text-primary bg-neutral-300/70 dark:bg-neutral-900/50"
        : "text-foreground"
        }
      `
    }
  >
    {link.name}
  </NavLink>
  ))}
</nav>
  );
};

export default DrawerNav;