import { buttonVariants, Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import LogoType from '@/components/logo/logoType';
import ThemeSwitch from '@/components/themeSwitch';
import { useAuth } from '@/prodivers/auth/authContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';


const Header = () => {

  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const logoutUser = () => {
    logout()
    navigate('/')
  }

  return (
<header className='h-header w-full flex items-center justify-between px-6 py-2 bg-background'>
    
    <Link to='/'>
      <LogoType />
    </Link>

    <div className='flex gap-2 items-center'>

      {user._id &&
        <>
          <Button variant='secondary' onClick={() => logoutUser()}>Log out</Button>
          <Link className={`${buttonVariants({ variant: "default" })} gap-2`} to={'/myAccount'}>
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <p className='flex items-center'>{user?.username}</p>
          </Link>
        </>
      }

      {!user._id &&
        <>
          <Link to='/signup' className={buttonVariants({ variant: "default" })}>Sign up</Link>
          <Link to='/login' className={buttonVariants({ variant: "secondary" })}>Log in</Link>
        </>
      }

      <div className='h-[40px] w-[2px] ml-2 bg-primary opacity-20'/>
      <ThemeSwitch />
    </div>


    
</header>
  );
};

export default Header;