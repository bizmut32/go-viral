import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Need, Needs, NeedUpdate, Towns, Offer, Offers, OfferUpdate, User, IdUsers, IdUser, IdUserUpdate, NeedWithUser, UserWithNeeds, OfferWitthUser } from '../model/api.model';
import { Request } from '../model/request.model';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  authEncode(email: string, password: string) {
    return btoa(email + ':' + password);
  }

  getTowns(): Promise<Towns> {
    return new Request<Towns>(this.http).get('/towns');
  }

  getTownsByZipcode(zipcode: string): Promise<Towns> {
    return new Request<Towns>(this.http).get(`/towns/${zipcode}`);
  }

  postNeed(need: Need): Promise<{id: string}> {
    return new Request<{id: string}>(this.http).post('/needs', need);
  }

  getNeeds(): Promise<{ items: NeedWithUser[] }> {
    return new Request<{ items: NeedWithUser[] }>(this.http).get('/needs');
  }

  getNeedById(id: string): Promise<NeedWithUser> {
    return new Request<NeedWithUser>(this.http).get(`/needs/${id}`);
  }

  patchNeedById(id: string, need: NeedUpdate): Promise<any> {
    return new Request<any>(this.http).patch(`/needs/${id}`, need);
  }

  postOffer(offer: Offer): Promise<any> {
    return new Request<any>(this.http).post('/offers', offer);
  }

  getOffers(): Promise<{items: OfferWitthUser[]}> {
    return new Request<{items: OfferWitthUser[]}>(this.http).get('/offers');
  }

  getOfferById(offerId: string): Promise<Offer> {
    return new Request<Offer>(this.http).get(`/offers/${offerId}`);
  }

  patchOfferById(offerId: string, offer: OfferUpdate): Promise<any> {
    return new Request<any>(this.http).patch(`/offers/${offerId}`, offer);
  }

  postUser(user: User): Promise<{_id: string}> {
    return new Request<{_id: string}>(this.http).post('/users', user);
  }

  getUsers(authHeader: string): Promise<{items: UserWithNeeds[]}> {
    return new Request<{items: UserWithNeeds[]}>(this.http).header('Authorization', `Basic ${authHeader}`).get('/users');
  }

  getUserById(authHeader: string, userId: string): Promise<UserWithNeeds> {
    return new Request<UserWithNeeds>(this.http).header('Authorization', `Basic ${authHeader}`).get(`/users/${userId}`);
  }

  getUserMe(authHeader: string): Promise<UserWithNeeds> {
    return new Request<UserWithNeeds>(this.http).header('Authorization', `Basic ${authHeader}`).get(`/users/me`);
  }

  patchUserMe(authHeader, me: IdUserUpdate): Promise<any> {
    return new Request<any>(this.http).header('Authorization', `Basic ${authHeader}`).patch(`/users/me`, me);
  }

  postRequestAccessById(authHeader: string, userId: string): Promise<any> {
    return new Request<any>(this.http).header('Authorization', `Basic ${authHeader}`).post(`/requestAccess/${userId}`, authHeader);
  }

  getUserContacts(authHeader: string): Promise<{ items: { views: IdUser[], pending: any[] } }> {
    return new Request<any>(this.http).header('Authorization', `Basic ${authHeader}`).get(`/users/myContacts`);
  }

}
