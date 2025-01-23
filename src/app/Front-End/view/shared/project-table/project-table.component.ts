import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectUpload } from 'src/app/Front-End/core/model/project.model';
import { AlertService } from 'src/app/Front-End/core/service/alerts.service';
import { ProjectUploadService } from 'src/app/Front-End/core/service/project-upload.service';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent {
  @Input() projects: ProjectUpload[] = []; 
  isViewMode: boolean = true; 
  @Output() jobUpdated = new EventEmitter< ProjectUpload>();
  @Output() jobDeleted = new EventEmitter<string>();
  
  constructor(private router: Router, private projectUploadService: ProjectUploadService, private alert:AlertService) { }

  onJobProjectUpdated(updatedProject: ProjectUpload) {
    const index = this.projects.findIndex(project => project._id === updatedProject._id);
    if (index !== -1) {
      this.projects[index] = updatedProject;
    }
  }

  // Navigate to view job details page only if job status is active
  viewDetails(project:  ProjectUpload) {
    if (!project || !project._id) {
      console.error('Job ID is missing or invalid');
      return;
    }
      this.router.navigateByUrl(`view-project/${project._id}`)
  }






  async confirmDelete(project: ProjectUpload) {
    if (!project || !project._id) {
      console.error('Job data is not available');
      return;
    }
    try {
      const userConfirmed = await this.alert.showJobConfirmDelete();
      if (userConfirmed) {
        // Optimistically remove project from the table
        this.projects = this.projects.filter(p => p._id !== project._id);
        this.jobDeleted.emit(project._id);
  
        this.projectUploadService.deleteProjectById(project._id).subscribe(
          () => {
            this.alert.showJobDeletedSuccess();
          },
          (error) => {
            this.handleError(error, 'delete job post');
            // If deletion fails, add the project back to the list
            this.projects.push(project);
          }
        );
      }
    } catch (error) {
      console.error('Error during job delete confirmation:', error);
    }
  }
  



 private handleError(error: any, action: string) {
    console.error(`Error ${action}:`, error);
    alert(`Failed to ${action}. Please try again later.`);
  }


}
