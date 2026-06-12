import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedStateService, Profile, Application, OfferLetter, Drive, Reminder } from './shared-state.service';
import { ToastService, ToastState } from './toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  public profile$: Observable<Profile>;
  public offerLetter$: Observable<OfferLetter>;
  public toast$: Observable<ToastState>;
  public isProfileModalOpen$: Observable<boolean>;
  public students$: Observable<Profile[]>;
  public activeStudentId$: Observable<string>;
  public applications$: Observable<Application[]>;
  public reminders$: Observable<Reminder[]>;
  public latestDrive!: Drive;
  public showRemoveOfferModal = false;

  // Edit profile form state
  public editForm: Partial<Profile> = {};
  public showRemoveResumeModal = false;
  public resumeDragOver = false;

  constructor(
    private sharedStateService: SharedStateService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.profile$ = this.sharedStateService.profile$;
    this.applications$ = this.sharedStateService.applications$;
    this.offerLetter$ = this.sharedStateService.offerLetter$;
    this.toast$ = this.toastService.toast$;
    this.isProfileModalOpen$ = this.sharedStateService.profileModalOpen$;
    this.students$ = this.sharedStateService.students$;
    this.activeStudentId$ = this.sharedStateService.activeStudentId$;
    this.reminders$ = this.sharedStateService.reminders$;
  }

  ngOnInit(): void {
    // Ensure dashboard always opens on the main view
    this.sharedStateService.setProfileModalOpen(false);

    // Populate form data whenever profile changes
    this.profile$.subscribe(prof => {
      this.editForm = { ...prof };
    });

    // Extract the latest drive from our list of mock drives (e.g. Amazon id: 3 is standard for Amazon)
    this.sharedStateService.drives$.subscribe(drives => {
      if (drives && drives.length > 0) {
        // Find Amazon or first drive
        this.latestDrive = drives.find(d => d.company === 'Amazon') || drives[0];
      }
    });
  }

  public openEditProfile(): void {
    this.sharedStateService.setProfileModalOpen(true);
  }

  public getActiveApplicationsCount(apps: Application[] | null): number {
    if (!apps) return 0;
    return apps.filter(a => a.status === 'In Progress' || a.status === 'Selected').length;
  }

  public triggerOfferLetterUpload(): void {
    const fileInput = document.getElementById('dashboard-offer-letter-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  public handleOfferLetterUpload(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file.');
        return;
      }
      const fileUrl = URL.createObjectURL(file);
      this.sharedStateService.updateOfferLetter(true, file.name, fileUrl);
    }
  }

  public confirmRemoveOfferLetter(): void {
    this.showRemoveOfferModal = true;
  }

  public closeRemoveOfferLetterConfirm(): void {
    this.showRemoveOfferModal = false;
  }

  public removeOfferLetter(): void {
    this.sharedStateService.removeOfferLetter();
    this.showRemoveOfferModal = false;
    const fileInput = document.getElementById('dashboard-offer-letter-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  public goToAllDrives(): void {
    this.router.navigate(['../drives'], { relativeTo: this.route });
  }

  public switchStudent(studentId: string): void {
    this.sharedStateService.switchStudent(studentId);
  }

  // --- EDIT PROFILE MODAL ACTIONS ---
  public closeEditProfile(): void {
    this.sharedStateService.setProfileModalOpen(false);
    // Reset form state to current profile
    this.profile$.subscribe(prof => {
      this.editForm = { ...prof };
    }).unsubscribe();
  }

  public saveProfile(): void {
    this.sharedStateService.updateProfile(this.editForm);
    this.sharedStateService.setProfileModalOpen(false);
    this.toastService.showToast('Profile saved successfully!');
  }

  // --- RESUME UPLOADS IN PROFILE MODAL ---
  public handleResumeFileSelect(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.uploadResumeFile(fileList[0]);
    }
  }

  public onResumeDragOver(event: DragEvent): void {
    event.preventDefault();
    this.resumeDragOver = true;
  }

  public onResumeDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.resumeDragOver = false;
  }

  public onResumeDrop(event: DragEvent): void {
    event.preventDefault();
    this.resumeDragOver = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.uploadResumeFile(files[0]);
    }
  }

  private uploadResumeFile(file: File): void {
    if (file.type !== 'application/pdf') {
      this.toastService.showToast('Please upload a PDF file.');
      return;
    }
    const size = file.size > 1024 * 1024
      ? (file.size / 1024 / 1024).toFixed(1) + ' MB'
      : (file.size / 1024).toFixed(0) + ' KB';

    this.sharedStateService.uploadResume(file.name, size);
    this.toastService.showToast('Resume uploaded successfully!');
  }

  public confirmRemoveResume(): void {
    this.showRemoveResumeModal = true;
  }

  public closeRemoveResumeConfirm(): void {
    this.showRemoveResumeModal = false;
  }

  public removeResume(): void {
    this.sharedStateService.removeResume();
    this.showRemoveResumeModal = false;
    const fileInput = document.getElementById('resume-file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    this.toastService.showToast('Resume removed successfully.');
  }

  public autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
