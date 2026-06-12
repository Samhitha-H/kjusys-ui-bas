import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { ApplicationsPageComponent } from './applications-page/applications-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      breadcrumb: {
        module: 'KJUSYS',
        subModule: 'dashboard',
        url: 'placement-student/dashboard'
      },
      submenu: true,
    }
  },
  {
    path: 'applications',
    component: ApplicationsPageComponent,
    data: {
      breadcrumb: {
        module: 'KJUSYS',
        subModule: 'applications',
        url: 'placement-student/dashboard/applications'
      },
      submenu: true,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardModuleRoutingModule {}
