import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { IndexComponent } from './main/index/index.component';
import { RegistrateComponent } from './registrate/registrate.component';
import { ShoppingComponent } from './registrate/forms/shopping/shopping.component';
import { PersonalComponent } from './registrate/forms/personal/personal.component';
import { BioComponent } from './registrate/forms/bio/bio.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CheckComponent } from './registrate/forms/check/check.component';

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'prefix', children: [
    { path: '', component: IndexComponent, pathMatch: 'full' },
  ]},
  { path: 'registrate/:help/:category', component: RegistrateComponent, children: [
    { path: 'check', component: CheckComponent },
    { path: 'shopping', component: ShoppingComponent },
    { path: 'personal', component: PersonalComponent },
    { path: 'bio', component: BioComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
