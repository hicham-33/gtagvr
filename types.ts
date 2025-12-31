export enum Platform {
  MetaQuest = 'Meta Quest',
  SteamVR = 'SteamVR',
}

export enum Amount {
  OneThousand = 1000,
  TwoThousandFiveHundred = 2500,
  FiveThousand = 5000,
  TenThousand = 10000,
}

export type GenerationState = 'IDLE' | 'PROCESSING' | 'VERIFICATION';

export interface UserData {
  username: string;
  platform: Platform;
  amount: Amount;
}

export interface ActivityItem {
  username: string;
  amount: number;
  timeAgo: string;
  platform: string;
}