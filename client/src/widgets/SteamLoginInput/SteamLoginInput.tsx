import { cn } from "@/shared/lib/utils";
import { Icon } from "@/shared/ui/Icon/Icon";
import { Input } from "@/shared/ui/Input";
import { memo } from "react";

export const SteamLoginInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  isFinded?: boolean;
  isLoading?: boolean;
}> = memo(({ value, onChange, onBlur, className, isFinded, isLoading }) => {
  const FoundIcon = () => (
    <div className="flex items-center gap-2 bg-purple rounded-full px-2 py-1">
      <Icon name="tick-circle" className="text-accent" size={12} />
      <span className="text-accent not-sm:hidden text-xs font-medium">
        Аккаунт найден
      </span>
    </div>
  );

  const NotFoundIcon = () => (
    <div className="flex items-center gap-2 bg-red-500/20 rounded-full px-2 py-1">
      <Icon name="close" className="text-red-500" size={12} />
      <span className="text-red-500 not-sm:hidden text-xs font-medium">
        Аккаунт не найден
      </span>
    </div>
  );

  const LoadingIcon = () => (
    <div className="flex items-center gap-2 bg-purple/20 rounded-full px-2 py-1">
      <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-primary not-sm:hidden text-xs font-medium">
        Проверка...
      </span>
    </div>
  );

  const getIconRight = () => {
    if (!value) return null;
    if (isLoading) return <LoadingIcon />;
    if (!isFinded) return <NotFoundIcon />;
    if (isFinded) return <FoundIcon />;
    return null;
  };

  return (
    <Input
      variant="primary"
      size="lg"
      placeholder="Введите логин Steam"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      iconRight={getIconRight()}
      className={cn("w-full", className)}
    />
  );
});

SteamLoginInput.displayName = "SteamLoginInput";
