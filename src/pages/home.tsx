import Layout from '@/layouts/layout';
import Title from '@/components/ui/title';
import DndDemo from '@/components/home/dnd/dndDemo';
import Footer from '@/layouts/footer';
import RegisterCards from '@/components/home/registerCards';
import { useAuth } from '@/prodivers/auth/authContext';
import UserCard from '@/components/home/userCard';
import Loading from '@/layouts/loading';


const Home = () => {

  document.title = 'Dozy - Todo App'

  const { isGuest, authLoading } = useAuth()

  return (
<>
<Layout>
  
  {authLoading ?
    <Loading />
    :
    <div className={`flex ${isGuest ? 'max-lg:flex-col' : 'max-lg:flex-col-reverse'} max-lg:gap-16 h-full items-center`}>
      
      <div className='flex-1 flex flex-col justify-center gap-8 px-4 items-center lg:items-start'>
          <div>
            <Title className='max-sm:text-center text-3xl uppercase'>One task at the time</Title>
            <div className='h-[3px] w-[80%] lg:w-[40%] max-lg:mx-auto bg-primary/50 mb-6 mt-3'/>
          </div>

          <div className='flex flex-col gap-2'>
            <h2 className='flex items-center gap-3 text-xl font-semibold max-lg:justify-center'>
              <span className='flex items-center justify-center w-[30px] h-[30px] rounded-full bg-card text-primary border border-primary/50'>1</span>
              Simple To Use
            </h2>
            <p className='text-pretty max-w-[50ch] max-lg:text-center text-neutral-600 dark:text-neutral-300 ml-1'>
              Stay on top of your tasks with our simple, user-friendly to-do app. 
              Manage your daily tasks in just a few clicks. Whether for work, personal projects, or daily errands, our tool helps you to achieve your goals.
            </p>
          </div>

          <div className='flex flex-col gap-2'>
            <h2 className='flex items-center gap-3 text-xl font-semibold max-lg:justify-center'>
              <span className='flex items-center justify-center w-[30px] h-[30px] rounded-full bg-card text-primary border border-primary/50'>2</span>
              Reorder Your Priorities
            </h2>
            <p className='text-pretty max-w-[50ch] max-lg:text-center text-neutral-600 dark:text-neutral-300 ml-1'>
              Effortlessly organize and prioritize your tasks with simple drag-and-drop functionality.
            </p>
            <DndDemo />
          </div>

      </div>

        {isGuest ? <RegisterCards /> : <UserCard />}

    </div>
  }

</Layout>
<Footer />
</>
  );
};

export default Home;