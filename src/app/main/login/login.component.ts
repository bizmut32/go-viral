import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { animation } from 'src/app/components/animations';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [ animation() ]
})
export class LoginComponent implements OnInit {

  @Input() visible: boolean = true;
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor(private account: AccountService, private router: Router) { }

  ngOnInit() {
  }

  close() {
    this.visible = false;
    this.visibleChange.next(this.visible);
  }

  login() {
    this.account.account = {
      name: 'Balassa Ádám',
      email: 'kjbwrfiebw',
      phone: 'uwqhlfew',
      password: 'password'
    };
    this.router.navigateByUrl('/my-account');
    this.close();
  }

}
