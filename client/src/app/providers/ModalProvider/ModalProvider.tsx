"use client";
import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  ReactNode,
} from "react";
import { Modal } from "@/shared/ui/Modal";

export interface ModalConfig {
  id: string;
  component: React.ComponentType<any> | ReactNode;
  props?: Record<string, any>;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  title?: string;
  description?: string;
}

export interface ModalState {
  isOpen: boolean;
  config: ModalConfig | null;
}

export interface ModalContextType {
  openModal: (config: Omit<ModalConfig, "id"> & { id?: string }) => string;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  isModalOpen: (id: string) => boolean;
  getModalState: (id: string) => ModalState | null;
  modals: Record<string, ModalState>;
}

const ModalContext = createContext<ModalContextType | null>(null);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<Record<string, ModalState>>({});

  const openModal = useCallback(
    (config: Omit<ModalConfig, "id"> & { id?: string }): string => {
      const id =
        config.id ||
        `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      setModals((prev) => ({
        ...prev,
        [id]: {
          isOpen: true,
          config: {
            id,
            ...config,
          },
        },
      }));

      return id;
    },
    []
  );

  const closeModal = useCallback((id: string) => {
    setModals((prev) => {
      const newModals = { ...prev };
      if (newModals[id]) {
        newModals[id] = {
          ...newModals[id],
          isOpen: false,
        };
      }
      return newModals;
    });

    // Удаляем модал из состояния через анимацию
    setTimeout(() => {
      setModals((prev) => {
        const newModals = { ...prev };
        delete newModals[id];
        return newModals;
      });
    }, 200);
  }, []);

  const closeAllModals = useCallback(() => {
    setModals({});
  }, []);

  const isModalOpen = useCallback(
    (id: string): boolean => {
      return modals[id]?.isOpen || false;
    },
    [modals]
  );

  const getModalState = useCallback(
    (id: string): ModalState | null => {
      return modals[id] || null;
    },
    [modals]
  );

  const contextValue: ModalContextType = {
    openModal,
    closeModal,
    closeAllModals,
    isModalOpen,
    getModalState,
    modals,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}

      {/* Рендер всех открытых модалок */}
      {Object.entries(modals).map(([id, modalState]) => {
        if (!modalState.isOpen || !modalState.config) return null;

        const { config } = modalState;
        const ModalComponent = config.component;

        return (
          <Modal
            key={id}
            open={modalState.isOpen}
            onOpenChange={(open) => {
              if (!open) {
                closeModal(id);
              }
            }}
            size={config.size}
            closeOnOverlayClick={config.closeOnOverlayClick}
            showCloseButton={config.showCloseButton}
            title={config.title}
            description={config.description}
          >
            {typeof ModalComponent === "function" ? (
              <ModalComponent
                {...config.props}
                modalId={id}
                onClose={() => closeModal(id)}
              />
            ) : (
              ModalComponent
            )}
          </Modal>
        );
      })}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
