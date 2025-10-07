import React from "react";
import { ModalProvider } from "./ModalProvider";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return <ModalProvider>{children}</ModalProvider>;
};
