import { Injectable } from '@angular/core';
import { PersonalData } from '../model/registration.model';
import { ServerService } from './server.service';
import { Need, User, Needs } from '../model/api.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  get loggedIn(): boolean { return this.account !== null; }
  account: PersonalData;

  constructor(private server: ServerService) { }

  getUserId(): Promise<string> {
    return this.server.getUserMe('').then(user => user._id);
  }

  getUserData(): Promise<User> {
    return this.server.getUserMe('');
  }

  async getUsersNeeds(): Promise<Need[]> {
    const userId = await this.getUserId();
    const allNeeds: Need[] = await this.server.getNeeds().then((result: Needs) => result.items);
    const myNeed = allNeeds.find(need => need.user_id === userId);
    const needsInMyCategory = allNeeds.filter(need =>
        need.type === myNeed.type &&
        (Math.abs(need.location.zip - myNeed.location.zip) < 500) || need.location.city === myNeed.location.city);
    return needsInMyCategory;
  }
}
