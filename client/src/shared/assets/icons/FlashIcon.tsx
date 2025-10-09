import React from "react";

interface FlashIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const FlashIcon: React.FC<FlashIconProps> = ({ ...props }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.33998 13.28H9.42998V20.48C9.42998 22.16 10.34 22.5 11.45 21.24L19.02 12.64C19.95 11.59 19.56 10.72 18.15 10.72H15.06V3.52002C15.06 1.84002 14.15 1.50002 13.04 2.76002L5.46998 11.36C4.54998 12.42 4.93998 13.28 6.33998 13.28Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
