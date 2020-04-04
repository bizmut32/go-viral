import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SomeResult, Needs, NeedsUpdate, Towns, Offers, OffersUpdate } from '../model/api.model';
import { Request } from '../model/request.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }



  getTowns(): Promise<Towns> {
    return new Request<Towns>(this.http).get('/towns');
  }

  getTownsByZipcode(zipcode: string): Promise<Towns> {
    return new Request<Towns>(this.http).get(`/towns/${zipcode}`);
  }



  postNeeds(needs: Needs): Promise<SomeResult> {
    return new Request<SomeResult>(this.http).post('/needs', needs)
  }

  getNeeds(): Promise<Needs> {
    return new Request<Needs>(this.http).get('/needs');
  }

  getNeedsById(id: string): Promise<Needs> {
    return new Request<Needs>(this.http).get(`/needs/${id}`);
  }

  patchNeedsById(id: string, needs: NeedsUpdate): Promise<NeedsUpdate> {
    return new Request<NeedsUpdate>(this.http).patch(`/needs/${id}`, needs);
  }



  postOffers(offers: Offers): Promise<SomeResult> {
    return new Request<SomeResult>(this.http).post('/offers', offers)
  }

  getOffers(): Promise<Offers> {
    return new Request<Offers>(this.http).get('/offers');
  }

  getOffersById(offerId: string): Promise<Offers> {
    return new Request<Offers>(this.http).get(`/offers/${offerId}`);
  }

  patchOffersById(offerId: string, offers: OffersUpdate): Promise<OffersUpdate> {
    return new Request<OffersUpdate>(this.http).patch(`/offers/${offerId}`, offers);
  }

}
