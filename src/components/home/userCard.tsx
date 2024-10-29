import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from '@/prodivers/auth/authContext';
import { UserRoundCheck, ListChecks, Dot, LoaderCircle, Frown } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserCard = () => {

  const { user, fetchUserData, authLoading } = useAuth()

  useEffect(() => {
    fetchUserData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
<div className='flex flex-wrap items-center justify-center flex-1 h-fit'>

      <Card className='w-80 sm:w-[23rem] shadow-md flex flex-col justify-between gap-2'>
        <CardHeader>
          <CardTitle className='text-primary flex justify-between pb-3'>
            <span>{user.username}</span><UserRoundCheck />
          </CardTitle>
          <div className='bg-neutral-400/30 dark:bg-neutral-200/10 w-full h-[2px] rounded-full'/>
          <CardDescription className='pt-4 flex justify-between'>
              <span>Your lists</span><ListChecks />
          </CardDescription>
        </CardHeader>

        <CardContent>
          {authLoading ? <LoaderCircle  className='animate-spin mx-auto'/> : 
            (user.lists.length !== 0 ? 
              <ul className='flex flex-col gap-2 py-2 px-1 max-h-[260px] overflow-y-auto'>
                {user.lists.map((list) => (
                  <li key={list._id} className='w-full bg-surface rounded border shadow-sm text-neutral-800 dark:text-neutral-300 hover:bg-surface/70 hover:border-primary'>
                    <Link 
                      to={`/taskboard/#${list._id}`}
                      className='h-full w-full flex p-2 outline-none focus-visible:outline-primary rounded'
                    >
                      <Dot className='text-primary shrink-0'/>
                      <span className='max-w-[250px] overflow-hidden text-ellipsis'>{list.name}</span>
                    </Link>
                  </li>
                ))}
              </ul> 
              : 
              <div className='text-sm flex flex-col gap-1 text-neutral-800 dark:text-neutral-300'>
                <div className='flex items-center gap-1 opacity-50'>Empty <Frown size={18}/></div>
                <div>
                  Create one <Link to='/taskboard' className='text-primary underline underline-offset-2 hover:text-primary-hover'>here.</Link>
                </div>
             </div>
            )
          }
        </CardContent>
      </Card>

</div>
  );
};

export default UserCard;