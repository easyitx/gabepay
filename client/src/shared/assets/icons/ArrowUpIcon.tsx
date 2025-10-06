import React from "react";

interface ArrowUpIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const ArrowUpIcon: React.FC<ArrowUpIconProps> = ({
  size = 24,
  ...props
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.92 15.05L13.4 8.53005C12.63 7.76005 11.37 7.76005 10.6 8.53005L4.07996 15.05"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
