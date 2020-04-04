import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-my-contacts',
  templateUrl: './my-contacts.component.html',
  styleUrls: ['./my-contacts.component.css']
})
export class MyContactsComponent implements OnInit {

  constructor(private account: AccountService) { }

  ngOnInit() {
  }

  displayShoppingFrequency(n: number): string {
    switch (n) {
      case 0: return 'egyszer';
      case 1: return 'naponta';
      case 2: return '2 naponta';
      case 3: return 'hetente kétszer';
      case 7: return 'hetente';
      case 14: return 'ritkábban, mint hetente';
    }
  }

}
