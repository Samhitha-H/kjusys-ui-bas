import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToastState {
  show: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor() {
    const win = window as any;
    if (win.sdccToastServiceInstance) {
      return win.sdccToastServiceInstance;
    }
    win.sdccToastServiceInstance = this;
  }

  private toastSubject = new BehaviorSubject<ToastState>({ show: false, message: '' });
  public toast$: Observable<ToastState> = this.toastSubject.asObservable();

  public showToast(message: string): void {
    this.toastSubject.next({ show: true, message });
    setTimeout(() => {
      this.toastSubject.next({ show: false, message: '' });
    }, 3000);
  }
}
