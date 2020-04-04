import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { IndexComponent } from './main/index/index.component';
import { RegistrateComponent } from './registrate/registrate.component';
import { ShoppingComponent } from './registrate/forms/shopping/shopping.component';

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'prefix', children: [
    { path: '', component: IndexComponent, pathMatch: 'full' },
  ]},
  { path: 'registrate/:help/:category', component: RegistrateComponent, children: [
    { path: 'shopping', component: ShoppingComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
