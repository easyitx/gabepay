"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group "
      position="top-right"
      richColors
      closeButton
      {...props}
    />
  );
};

export { Toaster };
