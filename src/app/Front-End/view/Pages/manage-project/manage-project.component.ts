import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectUpload } from 'src/app/Front-End/core/model/project.model';
import { ProjectUploadService } from 'src/app/Front-End/core/service/project-upload.service';

@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.css']
})
export class ManageProjectComponent {
  public projects: ProjectUpload[] = [];
  public errorMessage: string | null = null;

  constructor(private projectService: ProjectUploadService,   private router: Router) {
    this.fetchProjects();
  }


  get hasJobProjects(): boolean {
    return this.projects.length > 0;
  }


  
  fetchProjects() {
    this.projectService.getAllProjects().subscribe(
      (data: ProjectUpload[]) => {
        this.projects = data;
      },
      (error) => {
        console.error('Error fetching projects:', error);
        this.errorMessage = 'Failed to load job posts. Please try again later.';
      }
    );
  }


  onProjectDeleted(id: string) {
    this.projects = this.projects.filter(project => project._id !== id);
  }
  
  
  goBack(){
    this.router.navigate(['portfolio']);
  }

}
