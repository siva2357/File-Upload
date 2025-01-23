import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProjectUpload } from 'src/app/Front-End/core/model/project.model';
import { AlertService } from 'src/app/Front-End/core/service/alerts.service';
import { ProjectUploadService } from 'src/app/Front-End/core/service/project-upload.service';

@Component({
  selector: 'app-edit-project-details',
  templateUrl: './edit-project-details.component.html',
  styleUrls: ['./edit-project-details.component.css']
})
export class EditProjectDetailsComponent implements OnInit {
  @Input() project!: ProjectUpload;
  isLoading: boolean = false;
  projectUploadForm!: FormGroup;
  isEditMode: boolean = false;
  errorMessage: string = '';
  projectActive: boolean = true;
  projectId!: string;
  ifPreview: boolean = false;
  ifFetched: boolean = false;
  uploadedFileData: { fileName: string; url: string; filePath: string } | null = null;
  fetchedURL: string | null = null;
  previewURL: string | null = null;
  fileType: string | null = null;

  fileUploadProgress: Observable<number | undefined> | undefined;
  uploadComplete = false;


  constructor(
    private projectService: ProjectUploadService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private alert: AlertService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((param: Params) => {
      this.projectId = param['get']('id')!;
      console.log('Project ID:', this.projectId);
    });

    this.projectService.getProjectById(this.projectId).subscribe(
      (projectData: ProjectUpload) => {
        this.project = projectData;
        if (this.project) {
          this.initializeForm();
        } else {
          this.errorMessage = 'Project data not found';
        }
      },
      (error) => {
        this.errorMessage = 'Failed to load project data';
      }
    );
  }

  initializeForm(): void {
    if (this.project) {
      this.projectUploadForm = this.fb.group({
        projectTitle: [this.project.projectTitle || '', [Validators.required]],
        projectType: [this.project.projectType || '', [Validators.required]],
        softwares: [this.project.softwares || '', [Validators.required]],
        tags: [this.project.tags || '', [Validators.required]],
        projectDescription: [this.project.projectDescription || '', [Validators.required]],
        file: [null]
      });

      if (this.project.file) {
        this.fetchedURL = this.project.file.url;
        this.ifFetched = true;
      }

      if (!this.isEditMode) {
        this.projectUploadForm.disable();
      }
    }
  }

  goBack(): void {
    this.router.navigateByUrl('manage-projects');
  }

  openEditMode(): void {
    if (this.projectActive) {
      this.isEditMode = true;
      this.projectUploadForm.enable();
    } else {
      this.errorMessage = 'Project is closed, unable to edit.';
      this.projectUploadForm.disable();
    }
  }

  discardChanges(): void {
    this.projectUploadForm.reset({
      projectTitle: this.project.projectTitle,
      projectType: this.project.projectType,
      softwares: this.project.softwares,
      tags: this.project.tags,
      projectDescription: this.project.projectDescription,
      file: null
    });

    this.projectUploadForm.disable();
    this.isEditMode = false;
    this.previewURL = null;
    this.fileType = null;
    this.ifFetched = true;
  }

  updateProject(): void {
    if (this.projectUploadForm.valid) {
      const updatedProject = {
        ...this.projectUploadForm.value,
        file: this.uploadedFileData || this.project.file // Update the file data with the new file
      };

      this.isLoading = true;
      this.projectService.updateProjectById(this.projectId, updatedProject).subscribe({
        next: () => {
          this.resetState();
          this.projectUploadForm.reset();
          this.uploadedFileData = null;
          this.previewURL = null;
          this.ifPreview = false;
          this.uploadComplete= false;
          this.fileUploadProgress = undefined;

          this.alert.showJobUpdatedSuccess();
          this.router.navigateByUrl('manage-projects');
        },
        error: () => {
          this.errorMessage = 'Project update failed. Please try again.';
        }
      });
    }
  }

  resetState(): void {
    this.previewURL = null;
    this.ifPreview = false;
    this.isEditMode = false;
    this.uploadedFileData = null;
  }


  getFileType(file: File): string {
    const mimeType = file.type;

    if (mimeType.startsWith('image/')) {
      return 'image';
    } else if (mimeType.startsWith('video/')) {
      return 'video';
    } else if (mimeType === 'application/pdf') {
      return 'pdf';
    } else if (mimeType.startsWith('audio/')) {
      return 'audio';
    } else {
      return 'unknown';
    }
  }


  

  deletePreview(): void {
    this.previewURL = null;
    this.fileType = null;

    if (this.uploadedFileData) {
      const { filePath } = this.uploadedFileData;

      this.storage.ref(filePath).delete().subscribe({
        next: () => {
          console.log('File deleted from Firebase Storage');
          this.uploadedFileData = null;
          this.ifPreview = false;
        },
        error: (error) => {
          console.error('Error deleting file from Firebase Storage:', error);
          this.errorMessage = 'Failed to delete the file. Please try again.';
        }
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Reset any previous file data
      this.uploadedFileData = null;
  
      const filePath = `projects/${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
  
      // Show preview of the file
      this.previewURL = URL.createObjectURL(file);
      this.fileType = this.getFileType(file);
      this.ifPreview = true;
  
      this.fileUploadProgress = task.percentageChanges();
      this.ifPreview = true;
      // Handle the upload progress and completion
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            console.log('File uploaded successfully. URL:', url);
            this.uploadedFileData = {
              fileName: file.name,
              url: url,
              filePath: filePath
            };
            this.uploadComplete = true;

          });
        })
      ).subscribe({
        error: (error) => {
          console.error('Upload error:', error);
          this.errorMessage = 'File upload failed. Please try again.';
        }
      });
    }
  }

  
  

}
