import React from "react"

type SvgProps = React.HTMLAttributes<HTMLOrSVGElement>

const Logo = ({...props} : SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={"3.125rem"}
    height={"3.125rem"}
    viewBox="0 0 95 95"
    fill="none"
    className='shrink-0'
    {...props}
  >
    <path
      stroke="#f9521f"
      strokeLinecap="round"
      strokeWidth={7}
      d="M47.774 59.18 69 35 91.18 8.226M27.904 44.331l19.427 14.765"
    />
    <circle cx={49.5} cy={49.5} r={41} stroke="#f9521f" strokeWidth={7} />
    <circle cx={43} cy={43} r={42.25} stroke="#f9521f" strokeWidth={1.5} />
  </svg>
)

export default Logo