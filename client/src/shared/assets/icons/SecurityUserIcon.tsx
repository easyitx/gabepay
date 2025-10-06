import React from "react";

interface SecurityUserIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const SecurityUserIcon: React.FC<SecurityUserIconProps> = ({
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
        d="M10.74 2.23006L5.75003 4.10005C4.60003 4.53005 3.66003 5.89004 3.66003 7.12004V14.55C3.66003 15.73 4.44005 17.28 5.39005 17.99L9.69003 21.2001C11.1 22.2601 13.42 22.2601 14.83 21.2001L19.13 17.99C20.08 17.28 20.86 15.73 20.86 14.55V7.12004C20.86 5.89004 19.92 4.53005 18.77 4.10005L13.78 2.23006C12.93 1.92006 11.57 1.92006 10.74 2.23006Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.2501 10.92C12.2101 10.92 12.1601 10.92 12.1201 10.92C11.1801 10.89 10.4301 10.11 10.4301 9.16003C10.4301 8.19003 11.2201 7.40002 12.1901 7.40002C13.1601 7.40002 13.9501 8.19003 13.9501 9.16003C13.9401 10.12 13.1901 10.89 12.2501 10.92Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.26 13.7201C9.30004 14.3601 9.30004 15.4101 10.26 16.0501C11.35 16.7801 13.14 16.7801 14.23 16.0501C15.19 15.4101 15.19 14.3601 14.23 13.7201C13.15 12.9901 11.36 12.9901 10.26 13.7201Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
