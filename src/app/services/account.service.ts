import { Injectable } from '@angular/core';
import { PersonalData } from '../model/registration.model';
import { ServerService } from './server.service';
import { Need, User, Needs, NeedWithUser, Offer, OfferWitthUser } from '../model/api.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  get loggedIn(): boolean { return this.account !== null; }
  account: PersonalData = null;
  userId: string;

  constructor(private server: ServerService) { }

  login(email: string, password: string): Promise<any> {
    this.account = { email, password };
    return this.server.getUserMe(this.getAuthHeader());
  }

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
    const allNeeds: NeedWithUser[] = await this.server.getNeeds().then((result) => result.items);
    const allOffers: OfferWitthUser[] = await this.server.getOffers().then(result => result.items);
    const myOffer = allOffers.find(need => need.user_id === userId);
    const needsInMyCategory = allNeeds.filter(need =>
        need.user_id !== myOffer.user_id &&
        need.type === myOffer.type &&
        (Math.abs(need.location.zip - myOffer.location.zip) < 500) || need.location.city === myOffer.location.city);
    return needsInMyCategory;
  }

  async getUsersContacts(): Promise<Need> {
    return this.server.getUserContacts(await this.getUserId(), this.getAuthHeader());
  }

  private getAuthHeader(): string {
    return this.server.authEncode(this.account.email, this.account.password);
  }
}
