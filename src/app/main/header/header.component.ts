import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginVisible = false;
  constructor(public account: AccountService) { }

  ngOnInit() {
  }

  login() {
    this.loginVisible = true;
  }

  logout( ) {
    this.account.account = null;
  }

}
