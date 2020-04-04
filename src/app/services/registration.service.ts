import { Injectable } from '@angular/core';
import { RegistrationType, RegistrationStep, Category, RegistrationData } from '../model/registration.model';
import { Subject } from 'rxjs';

const registrationTypes: { [key: string]: RegistrationStep } = {
  personal: { url: 'personal', title: 'Személyes adatok' },
  bio: { url: 'bio', title: 'Bemutatkozás' },
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
    help: [ registrationTypes.shopping, registrationTypes.personal, registrationTypes.bio ],
    need: [ registrationTypes.shopping, registrationTypes.personal, registrationTypes.bio ]
  },
  teaching: {
    help: [ registrationTypes.teaching, registrationTypes.personal, registrationTypes.bio ],
    need: [ registrationTypes.teaching, registrationTypes.personal, registrationTypes.bio ]
  }
};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  next = new Subject();
  prev = new Subject();

  registrationData: RegistrationData = {};

  constructor() { }

  getSteps(category: RegistrationType): RegistrationStep[] {
    return category.help ? registrationSteps[category.category].help : registrationSteps[category.category].need;
  }
}
