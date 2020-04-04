import { Injectable } from '@angular/core';
import { PersonalData } from '../model/registration.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  get loggedIn(): boolean { return this.account !== null; }
  account: PersonalData = null;

  constructor() { }
}
