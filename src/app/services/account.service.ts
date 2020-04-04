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
  userId: string;

  constructor(private server: ServerService) { }

  getUserId(): Promise<string> {
    if (this.userId) return Promise.resolve(this.userId);
    return this.server.getUserMe(this.getAuthHeader()).then(user => {
      if (!this.userId) this.userId = user._id;
      return user._id;
    });
  }

  getUserData(): Promise<User> {
    return this.server.getUserMe(this.getAuthHeader());
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

  async getUsersContacts(): Promise<Need> {
    return this.server.getUserContacts(await this.getUserId(), this.getAuthHeader());
  }

  private getAuthHeader(): string {
    return this.server.authEncode(this.account.email, this.account.password);
  }
}
