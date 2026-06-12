import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardModuleRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ApplicationsPageComponent } from './applications-page/applications-page.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ApplicationsPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardModuleRoutingModule
  ]
})
export class DashboardModule { }
