import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { ReactNode } from "react";
import { Icon } from "../Icon/Icon";

interface ModalProps {
  children: ReactNode;
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

export const Modal = ({
  children,
  trigger,
  open,
  onOpenChange,
  title,
  description,
  size = "md",
  closeOnOverlayClick = true,
  showCloseButton = true,
}: ModalProps) => {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "w-screen h-screen max-w-none max-h-none",
  };

  const isFullSize = size === "full";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          onClick={closeOnOverlayClick ? undefined : (e) => e.preventDefault()}
        />

        <Dialog.Content
          className={`
            fixed z-50 grid w-full gap-4 bg-background p-6 
            shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out 
            data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
            ${
              isFullSize
                ? "inset-0 rounded-none"
                : `left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] ${sizeClasses[size]} border sm:rounded-lg data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]`
            }
          `}
        >
          {title ? (
            <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
              {title}
            </Dialog.Title>
          ) : (
            <VisuallyHidden.Root>
              <Dialog.Title>Модальное окно</Dialog.Title>
            </VisuallyHidden.Root>
          )}

          {description && (
            <Dialog.Description className="text-sm text-muted-foreground">
              {description}
            </Dialog.Description>
          )}

          <div className={`flex-1 ${isFullSize ? "overflow-auto" : ""}`}>
            {children}
          </div>

          {showCloseButton && (
            <Dialog.Close asChild>
              <button
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                aria-label="Закрыть"
              >
                <Icon name="close" className="text-foreground w-4 h-4" />
                <span className="sr-only">Закрыть</span>
              </button>
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
