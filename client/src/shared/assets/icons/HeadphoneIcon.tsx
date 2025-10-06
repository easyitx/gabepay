import React from "react";

interface HeadphoneIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const HeadphoneIcon: React.FC<HeadphoneIconProps> = ({
  size = 24,
  ...props
}) => {
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
        d="M5.70999 18.49V15.57C5.70999 14.6 6.46999 13.73 7.54999 13.73C8.51999 13.73 9.38999 14.49 9.38999 15.57V18.38C9.38999 20.33 7.76999 21.9501 5.81999 21.9501C3.86999 21.9501 2.24999 20.32 2.24999 18.38V12.22C2.13999 6.60005 6.57999 2.05005 12.2 2.05005C17.82 2.05005 22.25 6.60005 22.25 12.11V18.2701C22.25 20.2201 20.63 21.84 18.68 21.84C16.73 21.84 15.11 20.2201 15.11 18.2701V15.46C15.11 14.49 15.87 13.62 16.95 13.62C17.92 13.62 18.79 14.38 18.79 15.46V18.49"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
