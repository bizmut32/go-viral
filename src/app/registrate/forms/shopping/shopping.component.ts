import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { animation } from 'src/app/components/animations';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
  animations: [ animation() ]
})
export class ShoppingComponent implements OnInit {

  help: boolean;

  zip: string;
  city: string = '';
  frequency: number = -1;
  payment = {
    transfer: true,
    cash: true
  };
  constructor(private link: ActivatedRoute) {}

  ngOnInit() {
    this.setRegistrationType(this.link.snapshot.parent.params);
  }

  setRegistrationType(params) {
    this.help = params.help === 'help';
  }

  zipChanged() {
    if (this.zip.length === 4)
      this.city = 'Budapest';
    else this.city = '';

  }

}
