import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardModuleRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ApplicationsPageComponent } from './applications-page/applications-page.component';
import { BreadcrumbsTitleComponent, ButtonComponent, MiniFileuploadComponent, FileUploadComponent } from '@libs/shared-ui';
import { DropdownLibModule } from '@libs/dropdown-lib';

@NgModule({
  declarations: [
    DashboardComponent,
    ApplicationsPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardModuleRoutingModule,
    BreadcrumbsTitleComponent,
    ButtonComponent,
    MiniFileuploadComponent,
    FileUploadComponent,
    DropdownLibModule
  ]
})
export class DashboardModule { }
