import { buttonVariants, Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import LogoType from '@/components/logo/logoType';
import ThemeSwitch from '@/components/themeSwitch';
import { useAuth } from '@/prodivers/auth/authContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import SkeletonButton from '@/components/ui/skeletonButton';
import Nav from '@/components/nav';
import { Menu } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface HeaderProps {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({setIsDrawerOpen} : HeaderProps) => {

  const { logout, user, authLoading, isGuest } = useAuth()
  const navigate = useNavigate()

  const logoutUser = () => {
    logout()
    setTimeout(() => {
      navigate('/dozy/')
    }, 500)
  }

  return (
<header className='h-header w-full flex items-center justify-between px-2 sm:px-6 py-2 bg-background'>
    
    <Link to='/dozy/'>
      <LogoType />
    </Link>

    <Nav />

    
      <Button 
        variant='ghost' 
        className='flex items-start justify-center lg:hidden h-fit w-fit p-2'
        onClick={() => setIsDrawerOpen(true)}
      >
        {authLoading ? 
          <Skeleton className='h-[40px] w-[40px]'/> 
          : 
          (!isGuest ?
            <Avatar className='border'>
              <AvatarImage src={user.avatar} />
            </Avatar> 
            : 
            <Menu size={30}/>
          )
        }
      </Button>
    

    <div className='hidden gap-2 items-center lg:flex'>


          {authLoading ? 
            <>
              <SkeletonButton /> 
              <SkeletonButton />
            </>
            : 
            <>
            {!isGuest ?
              <> 
                <Button variant='secondary' onClick={logoutUser}>Log out</Button>
                <Link className={`${buttonVariants({ variant: "default" })} gap-2`} to={'/myAccount'}>
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      <Skeleton className='w-full h-full'/>
                    </AvatarFallback>
                  </Avatar>
                  <p className='flex items-center'>{user?.username}</p>
                </Link>
              </>
              :
              <>
                <Link to='/dozy/signup' className={buttonVariants({ variant: "default" })}>Sign up</Link>
                <Link to='/dozy/login' className={buttonVariants({ variant: "secondary" })}>Log in</Link>
              </>
            }
            </>
          }


      <div className='h-[40px] w-[2px] ml-2 bg-primary opacity-20'/>
      <ThemeSwitch />
    </div>


    
</header>
  );
};

export default Header;