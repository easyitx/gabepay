import React from "react";

interface UsdIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const UsdIcon: React.FC<UsdIconProps> = ({
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
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 6V18M9 8.5C9 7.67157 9.67157 7 10.5 7H13.5C14.3284 7 15 7.67157 15 8.5C15 9.32843 14.3284 10 13.5 10H10.5C9.67157 10 9 10.6716 9 11.5V12.5C9 13.3284 9.67157 14 10.5 14H13.5C14.3284 14 15 14.6716 15 15.5C15 16.3284 14.3284 17 13.5 17H10.5C9.67157 17 9 16.3284 9 15.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};