import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/model/api.model';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  user: User;
  constructor(private router: Router, public account: AccountService, private link: ActivatedRoute) { }

  ngOnInit() {
    this.account.getUserData().then(userData => {
      this.user = userData;
      this.router.navigate(['shopping-help'], {relativeTo: this.link});
    });
  }
}
