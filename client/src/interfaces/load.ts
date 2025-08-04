export interface Load {
  "@id"?: string;
  loadNumber: number;
  chemicalAmount: number;
  chemicalAmountGal?: number;
  waterAmount: number;
  waterAmountGal?: number;
  loader: string;
  chemical: string;
  mission: string;
  status: string;
}
