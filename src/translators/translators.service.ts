import { Injectable } from '@nestjs/common';
import { LocationsService } from '../locations/locations.service';
import { TranslatorProfileService } from '../translator-profile/translator-profile.service';
import { AvailabilitiesService } from '../availabilities/availabilities.service';

@Injectable()
export class TranslatorsService {
  constructor(
    private locationsService: LocationsService,
    private translatorProfileService: TranslatorProfileService,
    private availabilitiesService: AvailabilitiesService,
  ) {}

  async findAll() {
    const profiles = await this.translatorProfileService.findAll();
    return profiles;
  }

  async findBySearch(criteria: any) {
    let result = [];

    const locations: any = await this.locationsService.findBySearch(criteria);
    let creators = [];
    let location_ids = [];
    locations.forEach(async (element) => {
      location_ids.push(element.id);
      creators.push(element.creator._id);
    });
    const availabilities: any = await this.availabilitiesService.findByQuery({
      creator: creators,
    });
    creators = [];

    availabilities.forEach(async (element) => {
      let ok = true;

      if (location_ids.includes(element.location.id)) {
        if ('startTime' in criteria) {
          if (
            new Date(criteria.startTime).setHours(0, 0, 0, 0) >
            element.startTime.setHours(0, 0, 0, 0)
          ) {
            ok = false;
          }
        }
        if ('endTime' in criteria) {
          if (
            new Date(criteria.endTime).setHours(0, 0, 0, 0) <
            element.endTime.setHours(0, 0, 0, 0)
          ) {
            ok = false;
          }
        }
      } else {
        ok = false;
      }
      if (ok) {
        creators.push(element.creator.id);
      }
    });

    if (creators.length > 0) {
      const profiles: any = await this.translatorProfileService.findByQuery({
        creator: creators,
      });
      profiles.forEach((profile: any) => {
        let ok = true;
        if ('types_of_services' in criteria) {
          const array = criteria.types_of_services.split(',');
          array.forEach((element) => {
            if (!profile.types_of_services.includes(element)) {
              ok = false;
            }
          });
        }
        if ('languages' in criteria) {
          const array = criteria.languages.split(',');
          array.forEach((element) => {
            if (!profile.languages.includes(element)) {
              ok = false;
            }
          });
        }
        if (ok) {
          result.push(profile);
        }
      });
    }

    return result;
  }
}
