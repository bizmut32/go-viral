import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SomeData, SomeResult, SomeResult2 } from '../model/api.model';
import { Request } from '../model/request.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  postSomeData(data: SomeData): Promise<SomeResult> {
    return new Request<SomeResult>(this.http).post('/some/endpoint', data);
  }

  getSomeData(): Promise<SomeResult2> {
    return new Request<SomeResult2>(this.http).get('/some/other/endpoint');
  }
}
