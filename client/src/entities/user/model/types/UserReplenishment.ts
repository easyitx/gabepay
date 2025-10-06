interface UserReplenishment {
  id: string;
  username: string;
  avatar?: string;
  amount: number;
  currency: string;
  timestamp: string;
  isPositive: boolean;
}

export type { UserReplenishment };
