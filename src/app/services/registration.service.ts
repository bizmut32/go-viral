import { Injectable } from '@angular/core';
import { RegistrationType, RegistrationStep, Category } from '../model/registration.model';

const registrationTypes: { [key: string]: RegistrationStep } = {
  personal: { url: 'personal', title: 'Személyes adatok' },
  video: { url: 'view', title: 'Bemutatkozás' },
  shopping: { url: 'shopping', title: 'Bevásárlás' },
  teaching: { url: 'teaching', title: 'Tanítás' }
};

const registrationSteps: {
  [key: string]: {
    help: RegistrationStep[],
    need: RegistrationStep[]
  }
} = {
  shopping: {
    help: [ registrationTypes.shopping, registrationTypes.personal, registrationTypes.video ],
    need: [ registrationTypes.shopping, registrationTypes.personal, registrationTypes.video ]
  },
  teaching: {
    help: [ registrationTypes.teaching, registrationTypes.personal, registrationTypes.video ],
    need: [ registrationTypes.teaching, registrationTypes.personal, registrationTypes.video ]
  }
};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor() { }

  getSteps(category: RegistrationType): RegistrationStep[] {
    return category.help ? registrationSteps[category.category].help : registrationSteps[category.category].need;
  }
}
