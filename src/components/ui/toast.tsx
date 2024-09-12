import { useEffect } from 'react';
import { ToastVariant } from '@/prodivers/toasts/toastProvider';
import { cva } from "class-variance-authority"
import { cn } from '@/lib/utils';
import { CircleCheckBig, CircleX, TriangleAlert, Info, X } from 'lucide-react';
import { Button } from './button';

interface ToastProps {
  message: string
  variant: ToastVariant
  close: () => void
}

const Toast = ({message, variant, close}: ToastProps) => {

  const toastIcon = {
    info: <Info className='text-blue-200 shrink-0'/>,
    success: <CircleCheckBig className='text-green-200 shrink-0'/>,
    error: <CircleX className='text-red-200 shrink-0'/>,
    warning: <TriangleAlert className='text-orange-200 shrink-0'/>
  }

  const toastVariants = cva(
    "flex flex-col w-[340px] rounded-md overflow-hidden",
    {
      variants: {
        variant: {
          info: "bg-blue-500",
          success:
            "bg-green-500",
          warning:
            "bg-orange-500",
          error:
            "bg-red-500",
        },
      }
    }
  )

  const toastLineVariants = cva(
    "h-1 w-0 animate-toast-line",
    {
      variants: {
        variant: {
          info: "bg-blue-300",
          success: "bg-green-300",
          warning: "bg-orange-300",
          error: "bg-red-300",
        },
      }
    }
  )

  useEffect(() => {
    setTimeout(close, 5000)
  }, [close])

  return (
    <div className={cn(toastVariants({variant}))}>

      <div className='flex py-3 px-4 justify-between items-center'>

        <div className='flex gap-4 items-center'>
          {toastIcon[variant]}

          <p className='text-neutral-50 font-semibold'>
            {message}
          </p>

        </div>

        <Button 
          className='bg-transparent hover:bg-transparent h-fit w-fit p-0 hover:brightness-150'
          onClick={() => close()}
          aria-label='close'
        >
              <X />
        </Button>

      </div>

      <div className='w-full bg-neutral-900/40'>
        <div className={cn(toastLineVariants({variant}))}/>
      </div>

    </div>
  );
};

export default Toast;