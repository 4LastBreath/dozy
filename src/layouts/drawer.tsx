import React, { useEffect } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button, buttonVariants } from '@/components/ui/button';
import LogoType from '@/components/logo/logoType';
import DrawerNav from '@/components/drawerNav';
import { useAuth } from '@/prodivers/auth/authContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ThemeSwitch from '@/components/themeSwitch';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentWidth } from '@/hooks/useScreenSize';

interface DrawerDisplayProps {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DrawerDisplay = ({isOpen, setIsOpen} : DrawerDisplayProps) => {

  const { user, logout } = useAuth()
  const { lg } = useCurrentWidth()

  const navigate = useNavigate()

  const logoutUser = () => {
    logout()
    navigate('/dozy')
  }

  useEffect(() => {
    if (lg) setIsOpen(false)
  }, [lg, setIsOpen])

  return (
<Drawer open={isOpen} onOpenChange={setIsOpen} direction='left'>
  <DrawerContent className='flex flex-col items-center'>
    <DrawerHeader className='border-b-2 border-primary/30 dark:border-primary/20'>
      <DrawerTitle><LogoType /></DrawerTitle>
      <DrawerDescription className='text-center'>One task at the time</DrawerDescription>
    </DrawerHeader>

    <div className='flex flex-col items-center justify-between h-full w-full py-3'>

      <div className='flex flex-col w-full items-center justify-between mt-6'>

        {user._id &&
          <div className='flex flex-col gap-2 items-center mb-6'>
            <Avatar className='w-20 h-20 border'>
              <AvatarImage src={user.avatar}/>
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <h2 className='text-center text-lg opacity-70'>{user.username}</h2>
          </div>
        }

        <DrawerNav />
        
      </div>

      <ThemeSwitch />

    </div>

    <DrawerFooter className='w-full'>
      <DrawerClose asChild>
        {user._id ? 
          <Button variant="secondary" onClick={logoutUser}>Log out</Button>
          :
          <>
            <Link to='/signup' className={buttonVariants({ variant: "default" })}>Sign up</Link>
            <Link to='/login' className={buttonVariants({ variant: "secondary" })}>Log in</Link>
          </>
        }
        
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
  );
};

export default DrawerDisplay;