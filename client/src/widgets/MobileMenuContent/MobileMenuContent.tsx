import Button from "@/shared/ui/Button/Button";
import Navigation from "../Navigation/Navigation";
import { Icon } from "@/shared/ui/Icon/Icon";

export const MobileMenuContent: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Меню</h2>
        <Navigation
          isMobile={true}
          onItemClick={onClose}
          className="flex-col space-y-4"
        />
      </div>

      <div className="flex gap-4">
        <Button variant="icon" size="lg">
          <Icon name="telegram" size={24} />
        </Button>
        <Button variant="icon" size="lg">
          <Icon name="vk-icon" size={24} />
        </Button>
      </div>
    </div>
  );
};
