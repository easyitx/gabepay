"use client";

import { useState } from "react";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Typography } from "@/shared/ui/Typography";
import { Icon } from "@/shared/ui/Icon/Icon";
import Button from "@/shared/ui/Button/Button";

interface CashInOutInstructionsModalProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const CashInOutInstructionsModal: React.FC<CashInOutInstructionsModalProps> = ({
  trigger,
  open,
  onOpenChange,
}) => {
  if (!open) {
    return null;
  }
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Зарегистрируйтесь в CashInOut",
      description: "Создайте аккаунт на платформе CashInOut для начала работы",
      icon: "security-card" as const,
      details: [
        <span key="cashinout-link">
          Перейдите на сайт{" "}
          <button
            onClick={() => window.open('https://cashinout.io/?refererId=194805', '_blank')}
            className="text-accent hover:underline font-medium cursor-pointer"
          >
            CashInOut.io
          </button>
        </span>,
        "Зарегистрируйтесь на CashInOut",
      ]
    },
    {
      id: 2,
      title: "Пополните CashInOut любым удобным способом",
      description: "Выберите подходящий метод пополнения вашего кошелька",
      icon: "flash" as const,
      details: [
        "Войдите в личный кабинет CashInOut",
        "Выберите раздел 'Пополнение'",
        "Выберите удобный способ оплаты",
        "Следуйте инструкциям для завершения платежа"
      ]
    },
    {
      id: 3,
      title: "Пополните Steam на GabePay через созданный кошелек",
      description: "Используйте средства с CashInOut для пополнения Steam",
      icon: "strong-box" as const,
      details: [
        "Вернитесь на GabePay",
        "Выберите CashInOut как способ оплаты",
        "Введите данные вашего Steam аккаунта",
        "Подтвердите пополнение через CashInOut"
      ]
    }
  ];

  const currentStepData = steps.find(step => step.id === currentStep);

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };

  return (
    <Modal
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      title="Инструкция по пополнению через CashInOut"
      size="lg"
    >
      <div className="space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => handleStepClick(step.id)}
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                  ${currentStep >= step.id 
                    ? 'bg-accent border-accent text-primary' 
                    : 'border-muted-foreground text-muted-foreground hover:border-accent'
                  }
                `}
              >
                {currentStep > step.id ? (
                  <Icon name="filled-star" className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </button>
              {index < steps.length - 1 && (
                <div 
                  className={`
                    w-16 h-0.5 mx-2 transition-colors
                    ${currentStep > step.id ? 'bg-accent' : 'bg-muted-foreground/30'}
                  `}
                />
              )}
            </div>
          ))}
        </div>

        {/* Current Step Content */}
        {currentStepData && (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Icon
                  name={currentStepData.icon}
                  className="w-12 h-12 p-2 bg-accent text-primary rounded-xl"
                />
              </div>
              <div className="flex-1">
                <Typography variant="h3" color="accent" className="text-lg mb-2">
                  {currentStepData.title}
                </Typography>
                <Typography variant="body" color="foreground" className="text-sm mb-4">
                  {currentStepData.description}
                </Typography>
              </div>
            </div>

            {/* Step Details */}
            <div className="bg-muted/20 rounded-lg p-4">
              <Typography variant="body" color="accent" className="text-sm font-medium mb-3">
                Подробные шаги:
              </Typography>
              <ul className="space-y-2">
                {currentStepData.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-accent text-primary rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                      {index + 1}
                    </span>
                    <Typography variant="body" color="foreground" className="text-sm">
                      {detail}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-4">
          <Button
            size="sm"
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <Icon name="arrow-up" className="w-4 h-4 rotate-[-90deg]" />
            Назад
          </Button>

          <Typography variant="caption" className="text-xs">
            Шаг {currentStep} из {steps.length}
          </Typography>

          {currentStep < steps.length ? (
            <Button
              size="sm"
              onClick={handleNextStep}
              className="flex items-center gap-2"
            >
              Далее
              <Icon name="arrow-up" className="w-4 h-4 rotate-90" />
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => {
                console.log("Готово button clicked, calling onOpenChange with false");
                onOpenChange?.(false);
              }}
              className="flex items-center gap-2"
            >
              Готово
              <Icon name="filled-star" className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* CashInOut Link */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between bg-accent/10 rounded-lg p-3">
            <div>
              <Typography variant="body" color="accent" className="text-sm font-medium">
                Готовы начать?
              </Typography>
              <Typography variant="caption" className="text-xs">
                Перейдите на CashInOut.io для регистрации
              </Typography>
            </div>
            <Button
              size="sm"
              onClick={() => window.open('https://cashinout.io/?refererId=194805', '_blank')}
              className="flex items-center gap-2"
            >
              Открыть CashInOut
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};