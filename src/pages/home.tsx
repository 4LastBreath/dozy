import Layout from '@/layouts/layout';
import Title from '@/components/ui/title';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Check, CheckCheck, X, UserRound, UserRoundCheck } from 'lucide-react';
import DndDemo from '@/components/home/dnd/dndDemo';


const Home = () => {
  return (
<Layout>
  <div className='flex h-full'>
  
  <div className='flex-1 flex flex-col gap-4'>
    <Title className='text-4xl'>One task at the time</Title>
    <p className='text-pretty max-w-[50ch]'>Stay on top of your tasks with our simple, user-friendly to-do app. Manage your daily tasks in just a few clicks. 
      Whether for work, personal projects, or daily errands, our tool helps you to achieve your goals.</p>
    
    <DndDemo />
  </div>

    <div className='flex gap-3 flex-1'>
      <Card className='w-72 shadow-md flex flex-col justify-between h-[350px]'>
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
          <Button variant='secondary'>Try it now</Button>
        </CardFooter>
      </Card>

      <Card className='w-72 shadow-md flex flex-col justify-between h-[350px]'>
        <CardHeader>
          <CardTitle className='text-primary flex gap-2 pb-3'>
            <span>Registered User </span><UserRoundCheck />
          </CardTitle>
          <div className='bg-primary/20 w-full h-[2px] rounded-full'/>
          <CardDescription className='pt-4'>
            Unlock full access to your taskboard
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
          <Button>Sign up</Button>
        </CardFooter>
      </Card>
    </div>
  </div>

</Layout>
  );
};

export default Home;