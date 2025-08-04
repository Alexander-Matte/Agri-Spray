export interface Chemical {
  "@id"?: string;
  name: string;
  applicationRate: number;
  readonly loads?: string[];
}
