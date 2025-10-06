import { cn } from "@/shared/lib/utils";
import { Icon } from "@/shared/ui/Icon/Icon";
import { Input } from "@/shared/ui/Input";

export const SteamLoginInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  className?: string;
  isFinded?: boolean;
}> = ({ value, onChange, className, isFinded }) => {
  const FoundIcon = () => (
    <div className="flex items-center gap-2 bg-purple rounded-full px-2 py-1">
      <Icon name="tick-circle" className="text-accent" size={12} />
      <span className="text-accent text-xs font-medium">Аккаунт найден</span>
    </div>
  );
  const NotFoundIcon = () => (
    <div className="flex items-center gap-2 bg-red-500 rounded-full px-2 py-1">
      <Icon name="tick-circle" className="text-accent" size={12} />
      <span className="text-accent text-xs font-medium">Аккаунт не найден</span>
    </div>
  );

  return (
    <Input
      variant="primary"
      size="lg"
      placeholder="Введите логин Steam"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      iconRight={value && isFinded ? <FoundIcon /> : <NotFoundIcon />}
      className={cn("w-full", className)}
    />
  );
};
