import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { animation } from 'src/app/components/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [ animation() ]
})
export class LoginComponent implements OnInit {

  @Input() visible: boolean = true;
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.visible = false;
    this.visibleChange.next(this.visible);
  }

}
