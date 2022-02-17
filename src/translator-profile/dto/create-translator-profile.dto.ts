import { Rating } from '../schemas/rating.schema';
export class CreateTranslatorProfileDto {
  creator?: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  date_of_birth: Date;
  gender: string;
  nationality: string;
  nationality_obj: string;
  country_of_residence: string;
  country_of_residence_obj: string;
  city: string;
  zip_code: string;
  address: string;
  picture: string;
  phone_number: string;
  occupation: string;
  languages: string[];
  types_of_services: string[];
  description: string;
  photo: string;
  average_rate: number;
  ratings: Rating[];
}
