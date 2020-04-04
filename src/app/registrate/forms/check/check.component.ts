import { Component, OnInit } from '@angular/core';
import { RegistrationData } from 'src/app/model/registration.model';
import { RegistrationService } from 'src/app/services/registration.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  help: boolean;
  result: RegistrationData;
  constructor(private link: ActivatedRoute, private registration: RegistrationService) {}

  ngOnInit() {
    this.setRegistrationType(this.link.snapshot.parent.params);
    this.result = this.registration.registrationData;
    // this.result.shopping = {
    //   zip: '1234',
    //   frequency: 2,
    //   description: 'SZöveg szöveg',
    //   payment: { transfer: true, cash: false }
    // };
    // this.result.personal = {
    //   name: 'Balassa Ádám',
    //   email: 'balassaadi@gmail.com',
    //   phone: '+36 30 680 3465',
    //   password: ''
    // }

    // this.result.bio = {
    //   video: { length: 5 },
    //   bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in nibh aliquam erat tempus elementum non sed neque. Suspendisse ipsum ligula, laoreet eu rutrum pulvinar, placerat ut orci. Pellentesque in blandit nibh. Nam laoreet ante in felis fermentum rhoncus. Cras porta posuere odio, porttitor maximus urna commodo ac'
    // }
  }

  setRegistrationType(params) {
    this.help = params.help === 'help';
  }

  next() {
    this.registration.next.next();
  }

  prev() {
    this.registration.prev.next();
  }

  displayShoppingFrequency(n: number): string {
    switch (n){
      case 0: return 'Egyszer';
      case 1: return 'Naponta';
      case 2: return '2 naponta';
      case 3: return 'Hetente kétszer';
      case 7: return 'Hetente';
      case 14: return 'Ritkábban, mint hetente';
    }
  }

}
