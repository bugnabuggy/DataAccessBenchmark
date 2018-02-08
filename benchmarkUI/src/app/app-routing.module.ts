import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HistoryComponent }   from './history.component';
import { SessionComponent }   from './session.component';



const routes: Routes = [
  { path: '', redirectTo: '/Session', pathMatch: 'full' },
  { path: 'Session', component: SessionComponent },
  { path: 'History', component: HistoryComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}