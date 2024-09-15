import * as React from "react"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {

    const inputPassword = type === 'password'
    const [showPassword, setShowPassword] = useState(false)

    const eyeClass = 'absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer text-neutral-900'
    

    return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input text-neutral-900 bg-white dark:bg-neutral-100 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 caret-primary placeholder:text-neutral-400",
          className
        )}
        ref={ref}
        {...props}
      />

      {inputPassword && (showPassword ? 
        <Eye size={16} onClick={() => setShowPassword(false)} className={eyeClass} role="button" aria-label="hide password"/> : 
        <EyeOff size={16} onClick={() => setShowPassword(true)} className={eyeClass} role="button" aria-label="show password"/>
      )}

    </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
