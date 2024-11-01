import React from "react"
import { useTheme } from "@/prodivers/theme/themeContext"

type SvgProps = React.HTMLAttributes<HTMLOrSVGElement>


const LogoType = ({...props} : SvgProps) => {

  const { theme } = useTheme()

return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={"11rem"}
    viewBox="0 0 407 121"
    fill="none"
    {...props}
  >
    <path
      fill={`${theme === 'dark' ? '#eee' : '#3D2005'}`}
      d="M153.556 93.737h-23.532V26.754h23.532c20.467 0 34.477 13.352 34.477 33.491 0 20.686-14.776 33.492-34.477 33.492Zm-7.114-51.77v36.556h7.114c11.602 0 18.059-7.333 18.059-18.278 0-2.517-.328-4.816-.985-7.114-2.846-7.99-9.084-11.164-17.074-11.164h-7.114Zm83.947 37.103c11.93 0 18.06-7.66 18.06-18.825 0-11.82-6.567-18.825-18.06-18.825-12.039 0-18.059 7.661-18.059 18.825 0 11.602 6.677 18.825 18.059 18.825Zm0 15.214c-20.576 0-34.476-14.01-34.476-34.039 0-20.686 14.557-34.039 34.476-34.039 20.686 0 34.477 13.9 34.477 34.04 0 20.795-14.447 34.038-34.477 34.038Zm60.307-15.432h36.009v14.885h-55.819V78.852l33.71-37.213h-31.521V26.754h51.441v14.885l-33.82 37.213Zm62.167 14.885V68.892c-13.243-2.955-20.904-13.9-20.904-27.034V26.754h16.417v15.104c0 7.88 4.706 12.696 12.587 12.696 8.099 0 12.586-4.707 12.586-12.696V26.754h16.418v15.104c0 13.353-7.771 23.97-20.686 27.034v24.845h-16.418Z"
    />
    <path
      stroke="#f9521f"
      strokeLinecap="round"
      strokeWidth={7}
      d="M63.774 72.18 85 48l22.181-26.774M43.904 57.331l19.427 14.765"
    />
    <circle cx={65.5} cy={62.5} r={41} stroke="#f9521f" strokeWidth={7} />
    <circle cx={59} cy={56} r={42.25} stroke="#f9521f" strokeWidth={1.5} />
  </svg>
  )
}

export default LogoType