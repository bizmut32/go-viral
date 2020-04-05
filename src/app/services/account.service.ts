import { Injectable } from '@angular/core';
import { PersonalData } from '../model/registration.model';
import { ServerService } from './server.service';
import { Need, User, Needs, NeedWithUser, Offer, OfferWitthUser, IdUser, UserBuilder } from '../model/api.model';

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
        need.type === myOffer.type &&
        (Math.abs(need.location.zip - myOffer.location.zip) < 100) || need.location.city === myOffer.location.city);
    return needsInMyCategory || [];
  }

  async getUsersContacts(): Promise<NeedWithUser[]> {
    // const contacts: IdUser[] = await this.server.getUserContacts(this.getAuthHeader()).then(users => users.items.views) || [];
    // const needs: NeedWithUser[] = await this.server.getNeeds().then(needs => {
    //   const filtered = needs.items.filter(need => contacts.find(user => user._id === need.user_id) !== null );
    //   return filtered.map(need => ({ ...need, user: contacts.find(user => user._id === need.user_id) }));
    // });
    // return needs;
    return Promise.resolve([
      new UserBuilder('Faragó Teodóra', 'farago.teodora@gmail.com', '+36 30 876 4732'),
      new UserBuilder('Irinyi Péter', 'fipeter@gmail.com', '+36 30 9754 732'),
      new UserBuilder('Németh Sebestyén', 'nsebi.98@gmail.com', '+36 30 621 4732')
    ]);
  }

  private getAuthHeader(): string {
    return this.server.authEncode(this.account.email, this.account.password);
  }
}
