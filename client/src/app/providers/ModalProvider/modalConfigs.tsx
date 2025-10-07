import React from "react";
import { ModalConfig } from "./ModalProvider";
import Button from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography";
import { Icon } from "@/shared/ui/Icon/Icon";

export const ConfirmationModal: React.FC<{
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  modalId?: string;
  onClose?: () => void;
}> = ({
  title = "Подтверждение",
  message,
  onConfirm,
  onCancel,
  confirmText = "Подтвердить",
  cancelText = "Отмена",
  variant = "default",
  onClose,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose?.();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose?.();
  };

  return (
    <div className="space-y-4">
      <Typography variant="body">{message}</Typography>
      <div className="flex justify-end space-x-2">
        <Button variant="primary" onClick={handleCancel}>
          {cancelText}
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          {confirmText}
        </Button>
      </div>
    </div>
  );
};

export const NotificationModal: React.FC<{
  title?: string;
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose?: () => void;
}> = ({ title, message, type = "info", onClose }) => {
  const icons = {
    success: <Icon name="tick-circle" />,
    error: <Icon name="close" />,
    warning: "⚠️",
    info: "ℹ️",
  };

  const colors = {
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-yellow-600",
    info: "text-blue-600",
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className={`text-4xl mb-2 ${colors[type]}`}>{icons[type]}</div>
        {title && (
          <Typography variant="h3" className="mb-2">
            {title}
          </Typography>
        )}
        <Typography variant="body">{message}</Typography>
      </div>
      <div className="flex justify-center">
        <Button onClick={onClose}>Понятно</Button>
      </div>
    </div>
  );
};

export const modalConfigs: Record<string, Omit<ModalConfig, "id">> = {
  confirmDelete: {
    component: ConfirmationModal,
    size: "sm",
    title: "Подтверждение удаления",
    props: {
      message:
        "Вы уверены, что хотите удалить этот элемент? Это действие нельзя отменить.",
      confirmText: "Удалить",
      cancelText: "Отмена",
      variant: "destructive",
    },
  },

  confirmReset: {
    component: ConfirmationModal,
    size: "sm",
    title: "Подтверждение сброса",
    props: {
      message:
        "Вы уверены, что хотите сбросить все настройки? Все изменения будут потеряны.",
      confirmText: "Сбросить",
      cancelText: "Отмена",
    },
  },

  successNotification: {
    component: NotificationModal,
    size: "sm",
    props: {
      type: "success",
      title: "Успешно!",
      message: "Операция выполнена успешно.",
    },
  },

  errorNotification: {
    component: NotificationModal,
    size: "sm",
    props: {
      type: "error",
      title: "Ошибка",
      message: "Произошла ошибка при выполнении операции.",
    },
  },

  infoNotification: {
    component: NotificationModal,
    size: "sm",
    props: {
      type: "info",
      title: "Информация",
      message: "Дополнительная информация для пользователя.",
    },
  },
};
