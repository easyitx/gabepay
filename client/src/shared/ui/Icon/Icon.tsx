import { cn } from "@/shared/lib/utils";
import { type IconName } from "./model/types";

import {
  SphereIcon,
  DiscountCircleIcon,
  EmptyStarIcon,
  FilledStarIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  Flash2Icon,
  FlashIcon,
  HeadphoneIcon,
  MessageQuestionIcon,
  RadarIcon,
  SecurityCardIcon,
  SecurityUserIcon,
  StrongBoxIcon,
  TelegramIcon,
  TicketCircleIcon,
  TicketIcon,
  VkIcon,
} from "./model/Icons";

interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "width" | "height"> {
  name: IconName;
  size?: number;
}

const iconComponents: Record<IconName, unknown> = {
  sphere: SphereIcon,
  "discount-circle": DiscountCircleIcon,
  "empty-star": EmptyStarIcon,
  "filled-star": FilledStarIcon,
  "arrow-down": ArrowDownIcon,
  "arrow-up": ArrowUpIcon,
  "flash-2": Flash2Icon,
  flash: FlashIcon,
  headphone: HeadphoneIcon,
  "message-question": MessageQuestionIcon,
  radar: RadarIcon,
  "security-card": SecurityCardIcon,
  "security-user": SecurityUserIcon,
  "strong-box": StrongBoxIcon,
  telegram: TelegramIcon,
  "tick-circle": TicketCircleIcon,
  "vk-icon": VkIcon,
  ticket: TicketIcon,
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className,
  ...props
}) => {
  const IconComponent = iconComponents[
    name as keyof typeof iconComponents
  ] as any;

  if (!IconComponent) {
    return <span>Icon not found: {name}</span>;
  }

  if (typeof IconComponent === "function") {
    return (
      <IconComponent
        width={size}
        height={size}
        className={cn("inline-flex shrink-0 ", className)}
        {...props}
      />
    );
  }
};
