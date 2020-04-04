import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { RegistrationStep, RegistrationType, Category, ShoppingData } from '../model/registration.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
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

  shoppingData?: ShoppingData;

  constructor(private registrationService: RegistrationService, private link: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subscriptions.push( this.link.params.subscribe(params => {
      this.setRegistrationType(params);
      this.setRegistrationSteps();
      this.loadForm();
    }));
    this.subscriptions.push( this.registrationService.next.subscribe(() => {
      this.next();
    }));

    this.subscriptions.push( this.registrationService.prev.subscribe(() => {
      this.prev();
    }));
  }

  prev() {
    if (this.currentStep === 0) return;
    this.currentStep--;
    this.loadForm();
  }

  next() {
    console.log('next');
    if (this.currentStep === this.steps.length - 1) return;
    this.currentStep++;
    this.loadForm();
  }

  setRegistrationSteps() {
    this.steps = this.registrationService.getSteps(this.registrationType);
    this.steps.push({ url: 'check', 'title': 'Adatok ellenőrzése' });
  }

  setRegistrationType(params) {
    const help: boolean = params.help === 'help';
    const category: Category = params.category;
    this.registrationType = { help, category };
  }

  loadForm() {
    this.router.navigate([this.steps[this.currentStep].url], {relativeTo: this.link});
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
