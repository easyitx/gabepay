import React from "react";

interface VkIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const VkIcon: React.FC<VkIconProps> = ({ size = 24, ...props }) => {
  return (
    <svg
      width="18"
      height="10"
      viewBox="0 0 18 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.62563 6.97139V0H10.3324V3.86108C12.4977 3.60367 13.8661 1.17977 14.2797 0H17.0992C16.7608 2.4668 14.524 4.36159 13.3774 4.9336C15.2947 5.52348 17.6631 8.36566 17.6631 9.97444H14.7308C13.6481 7.22879 11.3474 6.39937 10.3324 6.32787V9.97444C3.96027 10.4035 0.576863 5.3626 0.74604 0H3.56554C3.73472 5.04085 6.44144 6.54238 7.62563 6.97139Z"
        fill="currentColor"
      />
    </svg>
  );
};
