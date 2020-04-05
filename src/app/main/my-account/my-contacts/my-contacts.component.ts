import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { NeedWithUser } from 'src/app/model/api.model';

@Component({
  selector: 'app-my-contacts',
  templateUrl: './my-contacts.component.html',
  styleUrls: ['./my-contacts.component.css']
})
export class MyContactsComponent implements OnInit {

  contacts: NeedWithUser[];
  loading = false;
  constructor(private account: AccountService) { }

  ngOnInit() {
    this.loading = true;
    this.account.getUsersContacts().then(c => this.contacts = c).finally(() => this.loading = false);
  }

  displayShoppingFrequency(n: any): string {
    n = parseInt(n);
    switch (n) {
      case 0: return 'egyszer';
      case 1: return 'naponta';
      case 2: return '2 naponta';
      case 3: return 'hetente kétszer';
      case 7: return 'hetente';
      case 14: return 'ritkábban, mint hetente';
    }
  }

  getAge(birthday: string) {
    const birthDate = new Date(birthday);
    const now = new Date();
    return now.getFullYear() - birthDate.getFullYear();
  }

}
