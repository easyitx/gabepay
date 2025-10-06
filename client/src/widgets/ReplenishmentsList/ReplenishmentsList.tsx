import React from "react";
import { UserReplenishmentCard } from "../UserReplenishmentCard/UserReplenishmentCard";
import { Typography } from "@/shared/ui/Typography";

const mockReplenishments = [
  {
    id: "1",
    username: "Royal_Cyber",
    avatar: "",
    amount: 500,
    currency: "₽",
    timestamp: "9 мин назад",
    isPositive: true,
  },
  {
    id: "2",
    username: "GamerPro",
    avatar: "",
    amount: 1200,
    currency: "₽",
    timestamp: "15 мин назад",
    isPositive: true,
  },
  {
    id: "3",
    username: "SteamMaster",
    avatar: "",
    amount: 750,
    currency: "₽",
    timestamp: "23 мин назад",
    isPositive: true,
  },
  {
    id: "4",
    username: "CyberNinja",
    avatar: "",
    amount: 300,
    currency: "₽",
    timestamp: "31 мин назад",
    isPositive: true,
  },
  {
    id: "5",
    username: "GameLord",
    avatar: "",
    amount: 2000,
    currency: "₽",
    timestamp: "45 мин назад",
    isPositive: true,
  },
  {
    id: "6",
    username: "PixelWarrior",
    avatar: "",
    amount: 850,
    currency: "₽",
    timestamp: "1 час назад",
    isPositive: true,
  },
  {
    id: "7",
    username: "DigitalKing",
    avatar: "",
    amount: 1500,
    currency: "₽",
    timestamp: "1 час 15 мин назад",
    isPositive: true,
  },
  {
    id: "8",
    username: "CodeBreaker",
    avatar: "",
    amount: 650,
    currency: "₽",
    timestamp: "1 час 30 мин назад",
    isPositive: true,
  },
  {
    id: "9",
    username: "TechGamer",
    avatar: "",
    amount: 1200,
    currency: "₽",
    timestamp: "2 часа назад",
    isPositive: true,
  },
  {
    id: "10",
    username: "VirtualHero",
    avatar: "",
    amount: 900,
    currency: "₽",
    timestamp: "2 часа 20 мин назад",
    isPositive: true,
  },
  {
    id: "11",
    username: "CyberPunk",
    avatar: "",
    amount: 1800,
    currency: "₽",
    timestamp: "2 часа 45 мин назад",
    isPositive: true,
  },
  {
    id: "12",
    username: "GameChanger",
    avatar: "",
    amount: 400,
    currency: "₽",
    timestamp: "3 часа назад",
    isPositive: true,
  },
  {
    id: "13",
    username: "SteamWarrior",
    avatar: "",
    amount: 1100,
    currency: "₽",
    timestamp: "3 часа 15 мин назад",
    isPositive: true,
  },
  {
    id: "14",
    username: "DigitalMaster",
    avatar: "",
    amount: 750,
    currency: "₽",
    timestamp: "3 часа 30 мин назад",
    isPositive: true,
  },
  {
    id: "15",
    username: "PixelMaster",
    avatar: "",
    amount: 1300,
    currency: "₽",
    timestamp: "4 часа назад",
    isPositive: true,
  },
  {
    id: "16",
    username: "CyberGamer",
    avatar: "",
    amount: 950,
    currency: "₽",
    timestamp: "4 часа 25 мин назад",
    isPositive: true,
  },
  {
    id: "17",
    username: "GamePro",
    avatar: "",
    amount: 600,
    currency: "₽",
    timestamp: "5 часов назад",
    isPositive: true,
  },
  {
    id: "18",
    username: "TechMaster",
    avatar: "",
    amount: 1400,
    currency: "₽",
    timestamp: "5 часов 10 мин назад",
    isPositive: true,
  },
  {
    id: "19",
    username: "VirtualGamer",
    avatar: "",
    amount: 800,
    currency: "₽",
    timestamp: "5 часов 35 мин назад",
    isPositive: true,
  },
  {
    id: "20",
    username: "SteamHero",
    avatar: "",
    amount: 1600,
    currency: "₽",
    timestamp: "6 часов назад",
    isPositive: true,
  },
];

const ReplenishmentsList = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="app-container  w-full">
        <Typography color="accent" variant="h2">
          Недавние пополнения
        </Typography>
      </div>

      <div className="w-full overflow-hidden flex  gap-3">
        {mockReplenishments.map((replenishment) => (
          <UserReplenishmentCard
            key={replenishment.id}
            replenishment={replenishment}
          />
        ))}
      </div>
    </div>
  );
};

export default ReplenishmentsList;
