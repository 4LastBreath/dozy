import { NavLink } from "react-router-dom";
import { navLinks } from "@/utils/navLinks";

const Nav = () => {
  return (
<nav className="hidden lg:flex gap-3" role='navigation' aria-label='primary'>
  {navLinks.map(link => {
    if (link.name === 'My Account') return

    return <NavLink to={link.path} key={link.name}
            end
            className={({ isActive }) =>
              `
                relative font-medium after:content-[''] after:w-0 after:h-[2px] after:bg-foreground after:absolute after:bottom-0 after:left-[50%] after:translate-x-[-50%]
                after:transition-all after:ease after:duration-200 hover:after:w-full
              ${isActive
                ? "text-primary after:w-full after:bg-primary" 
                : "text-foreground"
                }
              `
            }
          >
            {link.name}
          </NavLink>
})}
</nav>
  );
};

export default Nav;