import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, CheckCheck, X, UserRound, UserRoundCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegisterCards = () => {
  return (
<div className='flex flex-wrap items-center justify-center gap-3 flex-1 px-4 h-fit'>
      <Card className='w-72 shadow-md flex flex-col justify-between gap-2'>
        <CardHeader>
          <CardTitle className='text-neutral-500 dark:text-neutral-200 flex gap-2 pb-3'>
            <span>Guest</span><UserRound />
          </CardTitle>
          <div className='bg-neutral-400/30 dark:bg-neutral-200/10 w-full h-[2px] rounded-full'/>
          <CardDescription className='pt-4'>
              Limited access to your taskboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ul>
            <li className='flex gap-2'><Check className='text-green-400'/><span>1 list</span></li>
            <li className='flex gap-2'><Check className='text-green-400'/><span>30 tasks</span></li>
            <li className='flex gap-2'><X className='text-red-400'/><span>Data saved</span></li>
          </ul>
        </CardContent>
        <CardFooter>
        <Link to='/taskboard' className={buttonVariants({ variant: "secondary" })}>Try it now</Link>
        </CardFooter>
      </Card>

      <Card className='w-72 shadow-md flex flex-col justify-between gap-2'>
        <CardHeader>
          <CardTitle className='text-primary flex gap-2 pb-3'>
            <span>Registered User </span><UserRoundCheck />
          </CardTitle>
          <div className='bg-primary/20 w-full h-[2px] rounded-full'/>
          <CardDescription className='pt-4'>
            Full access to your taskboard
          </CardDescription>
        </CardHeader>
          
        <CardContent>
          <ul>
            <li className='flex gap-2'><CheckCheck className='text-green-400'/><span>10 lists</span></li>
            <li className='flex gap-2'><CheckCheck className='text-green-400'/><span>50 tasks per lists</span></li>
            <li className='flex gap-2'><CheckCheck className='text-green-400'/><span>Data saved</span></li>
          </ul>
        </CardContent>
        <CardFooter>
          <Link to='/signup' className={buttonVariants({ variant: "default" })}>Register</Link>
        </CardFooter>
      </Card>

</div>
  );
};

export default RegisterCards;