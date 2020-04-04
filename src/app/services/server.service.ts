import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SomeData, SomeResult } from '../model/api.model';
import { Request } from '../model/request.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  getSomeData(data: SomeData): Promise<SomeResult> {
    return new Request<SomeResult>(this.http).post('/some/endpoint', data);
  }
}
