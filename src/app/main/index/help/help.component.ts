import { Component, OnInit } from '@angular/core';
import { RegistrationStep, RegistrationType, ShoppingData, Category } from 'src/app/model/registration.model';
import { Subscription } from 'rxjs';
import { RegistrationService } from 'src/app/services/registration.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
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

    this.subscriptions.push( this.registrationService.registrate.subscribe(() => {
      this.steps = this.registrationService.getSteps(this.registrationType.category, false);
      this.loadForm();
    }));
  }

  prev() {
    if (this.currentStep === 0) return;
    this.currentStep--;
    this.loadForm();
  }

  next() {
    if (this.currentStep === this.steps.length - 1) return;
    this.currentStep++;
    this.loadForm();
  }

  setRegistrationSteps() {
    this.steps = this.registrationService.getSteps(this.registrationType.category);
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
