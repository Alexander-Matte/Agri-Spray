export interface Pilot {
  "@id"?: string;
  name: string;
  email: string;
  phoneNumber: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly missions?: string[];
}
