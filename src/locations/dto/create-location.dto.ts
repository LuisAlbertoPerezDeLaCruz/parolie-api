export class CreateLocationDto {
  creator?: string;
  address: string;
  locality: string;
  keywords: string;
  latitude: number;
  longitude: number;
  name: string;
  primary: boolean;
  color: string;
}
