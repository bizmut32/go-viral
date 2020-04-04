import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SomeResult, Needs, NeedsUpdate } from '../model/api.model';
import { Request } from '../model/request.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }
  
  postNeeds(needs: Needs): Promise<SomeResult> {
    return new Request<SomeResult>(this.http).post('/needs', needs)
  }
  
  getNeeds(): Promise<Needs> {
    return new Request<Needs>(this.http).get('/needs');
  }
  
  getNeedsById(id: string): Promise<Needs> {
    return new Request<Needs>(this.http).get(`/needs/${id}`);
  }
  
  patchNeedsById(id: string, needs: NeedsUpdate): Promise<SomeResult> {
    return new Request<NeedsUpdate>(this.http).patch(`/needs/${id}`, needs);
  }
  
}
