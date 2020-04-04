import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { RegistrationStep, RegistrationType, Category } from '../model/registration.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { relative } from 'path';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.css']
})
export class RegistrateComponent implements OnInit, OnDestroy {

  steps: RegistrationStep[];
  registrationType: RegistrationType;
  subscriptions: Subscription[] = [];
  currentStep: number = 0;

  constructor(private registrationService: RegistrationService, private link: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.setRegistrationType(this.link.snapshot.params);
    this.setRegistrationSteps();
    this.router.navigate([this.steps[this.currentStep].url], {relativeTo: this.link});
    this.subscriptions.push( this.link.params.subscribe(params => () => {
      this.setRegistrationType(params);
      this.setRegistrationSteps();
      console.log(this.steps);
    }));
  }

  setRegistrationSteps() {
    this.steps = this.registrationService.getSteps(this.registrationType);
  }

  setRegistrationType(params) {
    const help: boolean = params.help === 'help';
    const category: Category = params.category;
    this.registrationType = { help, category };
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
