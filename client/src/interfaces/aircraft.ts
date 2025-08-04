export interface Aircraft {
  "@id"?: string;
  registrationNumber: string;
  model: string;
  hopperCapacityGal: number;
  hopperCapacityLt: number;
  readonly missions?: string[];
}
