import { useModal } from "./ModalProvider";
import { modalConfigs } from "./modalConfigs";

export const useModalActions = () => {
  const { openModal, closeModal, isModalOpen } = useModal();

  const openModalByConfig = (
    configKey: string,
    props?: Record<string, any>
  ) => {
    const config = modalConfigs[configKey];
    if (!config) {
      console.error(`Modal config "${configKey}" not found`);
      return null;
    }

    return openModal({
      ...config,
      props: { ...config.props, ...props },
    });
  };

  const confirmDelete = (onConfirm: () => void, message?: string) => {
    return openModalByConfig("confirmDelete", {
      message: message || "Вы уверены, что хотите удалить этот элемент?",
      onConfirm,
    });
  };

  const confirmReset = (onConfirm: () => void, message?: string) => {
    return openModalByConfig("confirmReset", {
      message: message || "Вы уверены, что хотите сбросить все настройки?",
      onConfirm,
    });
  };

  const showSuccess = (message: string, title?: string) => {
    return openModalByConfig("successNotification", {
      message,
      title: title || "Успешно!",
    });
  };

  const showError = (message: string, title?: string) => {
    return openModalByConfig("errorNotification", {
      message,
      title: title || "Ошибка",
    });
  };

  const showWarning = (message: string, title?: string) => {
    return openModalByConfig("warningNotification", {
      message,
      title: title || "Внимание",
    });
  };

  const showInfo = (message: string, title?: string) => {
    return openModalByConfig("infoNotification", {
      message,
      title: title || "Информация",
    });
  };

  const showCustomConfirm = (
    message: string,
    onConfirm: () => void,
    options?: {
      title?: string;
      confirmText?: string;
      cancelText?: string;
      variant?: "default" | "destructive";
    }
  ) => {
    return openModal({
      component: modalConfigs.confirmDelete.component,
      size: "sm",
      title: options?.title || "Подтверждение",
      props: {
        message,
        onConfirm,
        confirmText: options?.confirmText || "Подтвердить",
        cancelText: options?.cancelText || "Отмена",
        variant: options?.variant || "default",
      },
    });
  };

  return {
    openModal,
    closeModal,
    isModalOpen,
    openModalByConfig,

    confirmDelete,
    confirmReset,
    showCustomConfirm,

    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
