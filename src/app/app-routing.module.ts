import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { IndexComponent } from './main/index/index.component';

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'prefix', children: [
    { path: '', component: IndexComponent, pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
