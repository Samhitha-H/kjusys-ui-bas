import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedStateService, Profile, Drive, Application, FormAnswer } from '../dashboard/shared-state.service';
import { SharedToastService } from '@libs/shared-toast';

@Component({
  selector: 'app-drives',
  templateUrl: './drives.component.html',
  styleUrls: ['./drives.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DrivesComponent implements OnInit {
  public drives$: Observable<Drive[]>;
  public profile$: Observable<Profile>;
  public applications$: Observable<Application[]>;

  public activeView: 'list' | 'detail' = 'list';
  public selectedDrive: Drive | null = null;
  public searchQuery: string = '';
  public isLoading = true;

  // Apply Modal Wizard state
  public showApplyModal = false;
  public applyStep: 'type' | 'default-confirm' | 'upload' | 'upload-confirm' | 'questions' = 'type';
  public resumeSource: 'default' | 'upload' = 'default';

  public uploadedResumeFile: File | null = null;
  public uploadedResumeFileName = '';
  public uploadedResumeFileSize = '';

  public answeredQuestions: { [id: string]: any } = {};
  public currentQuestions: any[] = [];

  constructor(
    private sharedStateService: SharedStateService,
    private toastService: SharedToastService
  ) {
    this.drives$ = this.sharedStateService.drives$;
    this.profile$ = this.sharedStateService.profile$;
    this.applications$ = this.sharedStateService.applications$;
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  public getFilteredDrives(drives: Drive[] | null): Drive[] {
    if (!drives) return [];
    if (!this.searchQuery.trim()) return drives;
    const query = this.searchQuery.toLowerCase();
    return drives.filter(d =>
      d.company.toLowerCase().includes(query) ||
      d.title.toLowerCase().includes(query)
    );
  }

  public openDriveDetail(drive: Drive): void {
    this.selectedDrive = drive;
    this.activeView = 'detail';
  }

  public goBackToList(): void {
    this.activeView = 'list';
    this.selectedDrive = null;
  }

  // --- APPLY WIZARD ---
  public openApply(drive: Drive): void {
    this.selectedDrive = drive;
    this.showApplyModal = true;
    this.applyStep = 'type';
    this.uploadedResumeFile = null;
    this.uploadedResumeFileName = '';
    this.uploadedResumeFileSize = '';
    this.answeredQuestions = {};
    this.currentQuestions = this.getCompanyQuestions();
    document.body.style.overflow = 'hidden';
  }

  public closeApply(): void {
    this.showApplyModal = false;
    document.body.style.overflow = '';
  }

  public chooseResume(type: 'default' | 'upload'): void {
    this.resumeSource = type;
    if (type === 'default') {
      if (this.currentQuestions && this.currentQuestions.length > 0) {
        this.applyStep = 'questions';
      } else {
        this.applyStep = 'default-confirm';
      }
    } else {
      this.applyStep = 'upload';
    }
  }

  public goBackToStep1(): void {
    this.applyStep = 'type';
  }

  public getCompanyQuestions(): any[] {
    if (this.selectedDrive) {
      const sourceQuestions = this.selectedDrive.additionalQuestions || this.selectedDrive.fields || [];
      if (sourceQuestions.length > 0) {
        return sourceQuestions.map(q => ({
          id: q.fieldId || (q as any).id,
          type: q.fieldType || (q as any).type,
          label: q.label,
          required: q.required,
          options: q.options
        }));
      }
    }
    return [
      { id: 'gen-q1', type: 'textarea', label: 'Why are you interested in joining ' + (this.selectedDrive ? this.selectedDrive.company : 'this company') + '?', required: true },
      { id: 'gen-q2', type: 'text', label: 'Any certifications or key projects related to this role?', required: false }
    ];
  }

  public handleApplyFileSelect(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      this.showApplyFilePreview(file);
    }
  }

  public showApplyFilePreview(file: File): void {
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file.');
      return;
    }
    this.uploadedResumeFile = file;
    this.uploadedResumeFileName = file.name;
    const size = file.size > 1024 * 1024
      ? (file.size / 1024 / 1024).toFixed(1) + ' MB'
      : (file.size / 1024).toFixed(0) + ' KB';
    this.uploadedResumeFileSize = size;
  }

  public clearApplyFile(): void {
    this.uploadedResumeFile = null;
    this.uploadedResumeFileName = '';
    this.uploadedResumeFileSize = '';
    const fileInput = document.getElementById('apply-resume-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  public proceedFromUpload(): void {
    if (!this.uploadedResumeFile) return;
    if (this.currentQuestions && this.currentQuestions.length > 0) {
      this.applyStep = 'questions';
    } else {
      this.applyStep = 'upload-confirm';
    }
  }

  public goBackFromQuestions(): void {
    if (this.resumeSource === 'default') {
      this.applyStep = 'type';
    } else {
      this.applyStep = 'upload';
    }
  }

  public proceedFromQuestions(): void {
    for (let q of this.currentQuestions) {
      const answer = this.answeredQuestions[q.id];
      if (q.required) {
        if (q.type === 'checkbox') {
          if (!answer) {
            alert(`Please check the required option: "${q.label}"`);
            return;
          }
        } else {
          if (!answer || !answer.trim()) {
            alert(`Please answer the required question: "${q.label}"`);
            return;
          }
        }
      }
    }
    if (this.resumeSource === 'default') {
      this.applyStep = 'default-confirm';
    } else {
      this.applyStep = 'upload-confirm';
    }
  }

  public checkEligibility(drive: Drive, profile: Profile): { eligible: boolean; reason?: string } {
    if (profile.freeze) {
      return { eligible: false, reason: 'Your placement profile is currently frozen' };
    }
    if (!profile.placementOptIn && !profile.optedIn) {
      return { eligible: false, reason: 'You have not opted-in for placements' };
    }
    const studentCGPA = parseFloat(profile.cgpa);
    if (studentCGPA < drive.minCGPA) {
      return { eligible: false, reason: `CGPA criteria not met (Min required: ${drive.minCGPA}, Your CGPA: ${profile.cgpa})` };
    }
    if (!drive.allowBacklog && profile.backlogs > 0) {
      return { eligible: false, reason: `Backlogs not allowed (You have ${profile.backlogs} backlog)` };
    }
    if (drive.eligibleBatches && profile.batchCode) {
      const eligibleList = drive.eligibleBatches.split(',').map(b => b.trim());
      if (!eligibleList.includes(profile.batchCode)) {
        return { eligible: false, reason: `Your batch (${profile.batchCode}) is not eligible for this drive` };
      }
    }
    return { eligible: true };
  }

  public hasApplied(drive: Drive, applications: Application[] | null): boolean {
    if (!applications) return false;
    return applications.some(app =>
      app.jobId === drive.jobId ||
      (app.company.toLowerCase() === drive.company.toLowerCase() &&
        app.title.toLowerCase() === drive.title.toLowerCase())
    );
  }

  public submitApplication(): void {
    if (!this.selectedDrive) return;
    const formAnswers: FormAnswer[] = Object.keys(this.answeredQuestions).map(key => ({
      answerId: 'ANS' + Math.floor(Math.random() * 100000),
      fieldId: key,
      answer: String(this.answeredQuestions[key])
    }));
    this.sharedStateService.addApplication(this.selectedDrive, formAnswers);
    this.toastService.success(`Applied to ${this.selectedDrive.company} – ${this.selectedDrive.title}!`);
    this.closeApply();
    this.goBackToList();
  }
}
