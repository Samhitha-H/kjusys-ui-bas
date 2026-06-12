import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Profile {
  id: string; // compatibility
  _id?: string; // database
  name: string; // compatibility
  firstName?: string; // database
  lastName?: string; // database
  course: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  skills: string;
  projects: string;
  achievements: string;
  score10th: string;
  score12th: string;
  cgpa: string;
  attendance: string;
  placementOptIn: boolean;
  resumeUploaded: boolean;
  resumeFileName: string | null;
  resumeFileSize: string | null;
  isPlaced: boolean;
  placedCompany: string | null;
  placedRole: string | null;
  placedLpa: number | null;
  rollNo: string;
  gender: string;
  dob?: string;
  section?: string;
  specialization: string;
  departmentName: string;
  backlogs: number;
  freeze: boolean;
  active?: boolean;
  optedIn?: boolean;
  batchCode: string;
}

export interface Reminder {
  id: number;
  company: string;
  title: string;
  type: string;
  date: string;
}

export interface FormAnswer {
  answerId: string;
  fieldId: string;
  answer: string;
}

export interface Application {
  id: number; // compatibility
  applicationId?: string; // database
  studentId: string;
  rollNo?: string;
  studentName?: string;
  placementId?: string;
  jobId?: string;
  companyId?: string;
  companyName?: string; // database
  company: string; // compatibility
  title: string; // compatibility
  appliedDate?: string;
  dateApplied: string; // compatibility
  lpa: number; // compatibility
  status: 'Selected' | 'In Progress' | 'Not Selected' | 'Upcoming Drive';
  resumeUrl?: string;
  formAnswers?: FormAnswer[];
}

export interface DriveField {
  fieldId: string;
  label: string;
  fieldType: string; // 'text' | 'dropdown' | 'select' | 'number'
  required: boolean;
  options?: string[];
}

export interface Drive {
  id: number; // compatibility
  jobId: string;
  placementId: string;
  companyId: string;
  company: string; // compatibility (companyName)
  title: string; // compatibility (role)
  lpa: number; // compatibility (packageLPA)
  location: string;
  minAggregate: string;
  minCGPA: number;
  deadline: string; // compatibility (driveEnd)
  type: string; // compatibility (employmentType)
  stipend: string;
  appOpens: string; // compatibility (driveStart)
  appCloses: string; // compatibility (driveEnd)
  backlogs: string;
  allowBacklog: boolean;
  courses: string; // compatibility (eligibleBatches)
  eligibleBatches: string;
  description: string;
  skills: string[];
  about: string;
  additionalQuestions: DriveField[];
  fields?: DriveField[]; // database compatibility
  active?: boolean;
}

export interface OfferLetter {
  uploaded: boolean;
  fileUrl: string | null;
  fileName: string | null;
}

const MOCK_STUDENTS: Profile[] = [
  {
    id: 'S001',
    _id: 'S001',
    rollNo: '25MCA001',
    firstName: 'ARJUN',
    lastName: 'NAIR',
    name: 'ARJUN NAIR',
    course: 'Master of Computer Applications',
    phone: '+91 9876543210',
    email: 'arjun@gmail.com',
    linkedin: 'linkedin.com/in/arjunnair',
    github: 'github.com/arjunnair',
    skills: 'Java, Spring Boot, Angular',
    projects: 'Build placements portal',
    achievements: 'Hackathon finalist',
    score10th: '92%',
    score12th: '90%',
    cgpa: '8.5',
    attendance: '95%',
    placementOptIn: true,
    resumeUploaded: true,
    resumeFileName: 'arjun_resume.pdf',
    resumeFileSize: '1.2 MB',
    isPlaced: true,
    placedCompany: 'Infosys',
    placedRole: 'Backend Developer',
    placedLpa: 6.5,
    gender: 'Male',
    dob: '2002-05-15',
    section: 'A',
    specialization: 'Cloud Computing',
    departmentName: 'Computer Applications',
    backlogs: 0,
    freeze: false,
    active: true,
    optedIn: true,
    batchCode: '25MCA'
  },
  {
    id: 'S002',
    _id: 'S002',
    rollNo: '25MCA002',
    firstName: 'RAHUL',
    lastName: 'DAS',
    name: 'RAHUL DAS',
    course: 'Master of Computer Applications',
    phone: '+91 9876543211',
    email: 'rahul@gmail.com',
    linkedin: 'linkedin.com/in/rahuldas',
    github: 'github.com/rahuldas',
    skills: 'Python, SQL, Machine Learning',
    projects: 'Data analysis dashboard',
    achievements: 'AWS Certified Cloud Practitioner',
    score10th: '88%',
    score12th: '85%',
    cgpa: '7.4',
    attendance: '88%',
    placementOptIn: true,
    resumeUploaded: false,
    resumeFileName: null,
    resumeFileSize: null,
    isPlaced: false,
    placedCompany: null,
    placedRole: null,
    placedLpa: null,
    gender: 'Male',
    dob: '2002-11-20',
    section: 'A',
    specialization: 'Data Science',
    departmentName: 'Computer Applications',
    backlogs: 1,
    freeze: false,
    active: true,
    optedIn: true,
    batchCode: '25MCA'
  }
];

const DEFAULT_APPLICATIONS: Application[] = [
  {
    id: 1,
    applicationId: 'A001',
    studentId: 'S001',
    rollNo: '25MCA001',
    studentName: 'ARJUN NAIR',
    placementId: 'P001',
    jobId: 'J001',
    companyId: 'C001',
    companyName: 'Infosys',
    company: 'Infosys',
    title: 'Backend Developer',
    appliedDate: '6/11/2026',
    dateApplied: '6/11/2026',
    lpa: 6.5,
    status: 'Selected',
    resumeUrl: '/resume/arjun.pdf',
    formAnswers: [
      {
        answerId: 'ANS001',
        fieldId: 'FF001',
        answer: 'github.com/arjun'
      },
      {
        answerId: 'ANS002',
        fieldId: 'FF002',
        answer: 'Java'
      }
    ]
  },
  {
    id: 2,
    applicationId: 'A002',
    studentId: 'S001',
    rollNo: '25MCA001',
    studentName: 'ARJUN NAIR',
    placementId: 'P002',
    jobId: 'J003',
    companyId: 'C002',
    companyName: 'Google',
    company: 'Google',
    title: 'Product Manager',
    appliedDate: '5/12/2026',
    dateApplied: 'May 12, 2026',
    lpa: 55,
    status: 'Selected',
    resumeUrl: '/resume/arjun.pdf',
    formAnswers: [
      {
        answerId: 'ANS003',
        fieldId: 'google-q1',
        answer: 'github.com/arjun/google-project'
      }
    ]
  }
];

const DEFAULT_REMINDERS: Reminder[] = [
  { id: 1, company: 'Google', title: 'Product Manager', type: 'Upcoming Drive', date: 'May 15, 2026' },
  { id: 2, company: 'Infosys', title: 'Frontend Developer', type: 'Upcoming Drive', date: 'June 10, 2026' }
];

const MOCK_DRIVES: Drive[] = [
  {
    id: 1,
    jobId: 'J001',
    placementId: 'P001',
    companyId: 'C001',
    company: 'Infosys',
    title: 'Backend Developer',
    lpa: 6.5,
    location: 'Bangalore, India',
    minAggregate: '7.0 CGPA',
    minCGPA: 7,
    deadline: '15-06-2026',
    type: 'Full Time',
    stipend: 'N/A',
    appOpens: '2026-06-10',
    appCloses: '2026-06-15',
    backlogs: 'No',
    allowBacklog: false,
    courses: '25MCA, 24CS',
    eligibleBatches: '25MCA,24CS',
    description: 'Design and develop high-performance backend microservices using Java/Python. Experience with relational databases and API design is required.',
    skills: ['Proficient in Java, Spring Boot, or Python', 'Experience with SQL databases', 'Understanding of RESTful APIs', 'Good problem solving skills'],
    about: 'Infosys is a global leader in next-generation digital services and consulting. Headquartered in Bangalore.',
    additionalQuestions: [
      { fieldId: 'FF001', label: 'Github Profile', fieldType: 'text', required: true },
      { fieldId: 'FF002', label: 'Preferred Backend Language', fieldType: 'dropdown', required: true, options: ['Java', 'Python', 'Go', 'Node.js'] }
    ],
    fields: [
      { fieldId: 'FF001', label: 'Github Profile', fieldType: 'text', required: true },
      { fieldId: 'FF002', label: 'Preferred Backend Language', fieldType: 'dropdown', required: true, options: ['Java', 'Python', 'Go', 'Node.js'] }
    ],
    active: true
  },
  {
    id: 2,
    jobId: 'J002',
    placementId: 'P001',
    companyId: 'C001',
    company: 'Infosys',
    title: 'Frontend Developer',
    lpa: 6,
    location: 'Bangalore, India',
    minAggregate: '6.5 CGPA',
    minCGPA: 6.5,
    deadline: '15-06-2026',
    type: 'Full Time',
    stipend: 'N/A',
    appOpens: '2026-06-10',
    appCloses: '2026-06-15',
    backlogs: 'No',
    allowBacklog: false,
    courses: '25MCA, 24BCA',
    eligibleBatches: '25MCA,24BCA',
    description: 'Build responsive and visually stunning web interfaces using Angular. Collaborate with backend developers to integrate web services.',
    skills: ['Strong JavaScript/TypeScript foundation', 'HTML5, CSS3, and responsive design', 'Experience with Angular is preferred', 'Collaborative mindset'],
    about: 'Infosys is a global leader in next-generation digital services and consulting. Headquartered in Bangalore.',
    additionalQuestions: [
      { fieldId: 'FF003', label: 'Portfolio URL', fieldType: 'text', required: true },
      { fieldId: 'FF004', label: 'Angular Experience', fieldType: 'number', required: false }
    ],
    fields: [
      { fieldId: 'FF003', label: 'Portfolio URL', fieldType: 'text', required: true },
      { fieldId: 'FF004', label: 'Angular Experience', fieldType: 'number', required: false }
    ],
    active: true
  },
  {
    id: 3,
    jobId: 'J003',
    placementId: 'P002',
    companyId: 'C002',
    company: 'Google',
    title: 'Product Manager',
    lpa: 55,
    location: 'Bengaluru, India',
    minAggregate: '8.0 CGPA',
    minCGPA: 8.0,
    deadline: '30-05-2026',
    type: 'Full Time',
    stipend: 'N/A',
    appOpens: '2026-05-10',
    appCloses: '2026-05-30',
    backlogs: 'No',
    allowBacklog: false,
    courses: '25MCA, 24BCA',
    eligibleBatches: '25MCA,24BCA',
    description: 'Drive the strategy, roadmap, and execution of Google products used by billions. Work with engineering, design, and business stakeholders.',
    skills: ['Strong analytical and problem-solving skills', 'Experience in product lifecycle management', 'Excellent communication', 'Familiarity with Agile methodologies'],
    about: 'Technology sector. Headquartered in Mountain View, CA.',
    additionalQuestions: [
      { fieldId: 'google-q1', label: 'Link to your portfolio or top project:', fieldType: 'text', required: true }
    ],
    fields: [
      { fieldId: 'google-q1', label: 'Link to your portfolio or top project:', fieldType: 'text', required: true }
    ],
    active: true
  }
];

interface GlobalState {
  students: Profile[];
  activeStudentId: string;
  applications: Application[];
  drives: Drive[];
  offerLetter: OfferLetter;
  isProfileModalOpen: boolean;
  reminders: Reminder[];
}

@Injectable({
  providedIn: 'root'
})
export class SharedStateService {
  private state!: GlobalState;

  private profileSubject!: BehaviorSubject<Profile>;
  private applicationsSubject!: BehaviorSubject<Application[]>;
  private drivesSubject!: BehaviorSubject<Drive[]>;
  private offerLetterSubject!: BehaviorSubject<OfferLetter>;
  private profileModalOpenSubject!: BehaviorSubject<boolean>;
  private remindersSubject!: BehaviorSubject<Reminder[]>;
  private studentsSubject!: BehaviorSubject<Profile[]>;
  private activeStudentIdSubject!: BehaviorSubject<string>;

  public profile$!: Observable<Profile>;
  public applications$!: Observable<Application[]>;
  public drives$!: Observable<Drive[]>;
  public offerLetter$!: Observable<OfferLetter>;
  public profileModalOpen$!: Observable<boolean>;
  public reminders$!: Observable<Reminder[]>;
  public students$!: Observable<Profile[]>;
  public activeStudentId$!: Observable<string>;

  constructor() {
    const win = window as any;
    if (win.sdccSharedStateServiceInstance) {
      return win.sdccSharedStateServiceInstance;
    }
    win.sdccSharedStateServiceInstance = this;

    // Initialize or bind window-level global state
    if (!win.sdccSharedState) {
      win.sdccSharedState = {
        students: [...MOCK_STUDENTS],
        activeStudentId: 'S001',
        applications: [...DEFAULT_APPLICATIONS],
        drives: [...MOCK_DRIVES],
        offerLetter: {
          uploaded: false,
          fileUrl: null,
          fileName: null
        },
        isProfileModalOpen: false,
        reminders: [...DEFAULT_REMINDERS]
      };
    }
    this.state = win.sdccSharedState;

    const initialStudent = this.state.students.find(s => s.id === this.state.activeStudentId) || this.state.students[0];
    const initialApps = this.state.applications.filter(a => a.studentId === initialStudent.id);

    this.profileSubject = new BehaviorSubject<Profile>(initialStudent);
    this.applicationsSubject = new BehaviorSubject<Application[]>(initialApps);
    this.drivesSubject = new BehaviorSubject<Drive[]>(this.state.drives);
    this.offerLetterSubject = new BehaviorSubject<OfferLetter>(this.state.offerLetter);
    this.profileModalOpenSubject = new BehaviorSubject<boolean>(this.state.isProfileModalOpen);
    this.remindersSubject = new BehaviorSubject<Reminder[]>(this.state.reminders);
    this.studentsSubject = new BehaviorSubject<Profile[]>(this.state.students);
    this.activeStudentIdSubject = new BehaviorSubject<string>(this.state.activeStudentId);

    this.profile$ = this.profileSubject.asObservable();
    this.applications$ = this.applicationsSubject.asObservable();
    this.drives$ = this.drivesSubject.asObservable();
    this.offerLetter$ = this.offerLetterSubject.asObservable();
    this.profileModalOpen$ = this.profileModalOpenSubject.asObservable();
    this.reminders$ = this.remindersSubject.asObservable();
    this.students$ = this.studentsSubject.asObservable();
    this.activeStudentId$ = this.activeStudentIdSubject.asObservable();
  }

  public setProfileModalOpen(open: boolean): void {
    this.state.isProfileModalOpen = open;
    this.profileModalOpenSubject.next(open);
  }

  public switchStudent(studentId: string): void {
    const student = this.state.students.find(s => s.id === studentId);
    if (student) {
      this.state.activeStudentId = studentId;
      this.activeStudentIdSubject.next(studentId);

      this.profileSubject.next(student);

      const studentApps = this.state.applications.filter(a => a.studentId === studentId);
      this.applicationsSubject.next(studentApps);
    }
  }

  // State mutation actions
  public updateProfile(updated: Partial<Profile>): void {
    const activeId = this.state.activeStudentId;
    const index = this.state.students.findIndex(s => s.id === activeId);
    if (index !== -1) {
      this.state.students[index] = { ...this.state.students[index], ...updated };
      this.profileSubject.next(this.state.students[index]);
      this.studentsSubject.next(this.state.students);
    }
  }

  public uploadResume(fileName: string, fileSize: string): void {
    this.updateProfile({
      resumeUploaded: true,
      resumeFileName: fileName,
      resumeFileSize: fileSize
    });
  }

  public removeResume(): void {
    this.updateProfile({
      resumeUploaded: false,
      resumeFileName: null,
      resumeFileSize: null
    });
  }

  public addApplication(drive: Drive, formAnswers: FormAnswer[] = []): void {
    const today = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const now = new Date();
    const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

    const activeId = this.state.activeStudentId;
    const activeStudent = this.state.students.find(s => s.id === activeId);

    const newApp: Application = {
      id: Date.now(),
      applicationId: 'A' + Math.floor(Math.random() * 100000),
      studentId: activeId,
      rollNo: activeStudent?.rollNo || '',
      studentName: activeStudent?.name || '',
      placementId: drive.placementId || 'P001',
      jobId: drive.jobId || 'J001',
      companyId: drive.companyId || 'C001',
      companyName: drive.company,
      company: drive.company,
      title: drive.title,
      appliedDate: formattedDate,
      dateApplied: today,
      lpa: drive.lpa,
      status: 'In Progress',
      resumeUrl: activeStudent?.resumeFileName ? `/resume/${activeStudent.resumeFileName}` : '/resume/custom.pdf',
      formAnswers: formAnswers
    };
    this.state.applications = [newApp, ...this.state.applications];

    const studentApps = this.state.applications.filter(a => a.studentId === activeId);
    this.applicationsSubject.next(studentApps);
  }

  public updateOfferLetter(uploaded: boolean, fileName: string | null, fileUrl: string | null): void {
    this.state.offerLetter = { uploaded, fileName, fileUrl };
    this.offerLetterSubject.next(this.state.offerLetter);
  }

  public removeOfferLetter(): void {
    this.state.offerLetter = { uploaded: false, fileName: null, fileUrl: null };
    this.offerLetterSubject.next(this.state.offerLetter);
  }
}
