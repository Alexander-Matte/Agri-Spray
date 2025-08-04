export interface Loader {
  "@id"?: string;
  name: string;
  phoneNumber: string;
  email?: string;
  readonly loads?: string[];
}
