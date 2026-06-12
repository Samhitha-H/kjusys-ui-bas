import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  leftmenu$!: Observable<any>;
  currentUser: any = { userId: 'Student', userName: 'Student' };
  toggle = false;
  isFullScreen = false;

  ngOnInit() {
    this.leftmenu$ = of({
      dashboard: {
        displayName: 'Dashboard',
        isOpen: false,
        isPinned: false,
        canActivate: [],
        icon: '',
        subModule: [
          { displayName: 'Dashboard', subPath: 'kjusys/dashboard', ngModuleName: 'DashboardModule' },
          { displayName: 'Drives', subPath: 'kjusys/drives', ngModuleName: 'DrivesModule' }
        ]
      }
    });
  }

  menuToggle() {
    this.toggle = !this.toggle;
  }
}
