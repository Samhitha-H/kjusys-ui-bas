import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedStateService, Application } from '../shared-state.service';

@Component({
  selector: 'app-applications-page',
  templateUrl: './applications-page.component.html'
})
export class ApplicationsPageComponent {
  public applications$: Observable<Application[]>;

  constructor(private sharedStateService: SharedStateService) {
    this.applications$ = this.sharedStateService.applications$;
  }
}
