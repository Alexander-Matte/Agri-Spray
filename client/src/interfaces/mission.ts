export interface Mission {
  "@id"?: string;
  title: string;
  type: string;
  fieldSizeTotal: number;
  fieldSizeSprayable: number;
  location: string;
  scheduledAt?: Date;
  status: string;
  pilot: string;
  aircraft?: string[];
  customer: string;
  base: string;
  readonly loads?: string[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
