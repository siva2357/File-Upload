import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectUpload } from 'src/app/Front-End/core/model/project.model';
import { ProjectUploadService } from 'src/app/Front-End/core/service/project-upload.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  projectId: string | null = null;
  projectDetails: ProjectUpload | null = null;

  constructor( private route: ActivatedRoute, private projectService: ProjectUploadService, private router:Router ) {}
  
  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId) {
      this.fetchProjectDetails(this.projectId);
    }
  }

  fetchProjectDetails(id: string): void {
    this.projectService.getProjectById(id).subscribe({
      next: (project) => (this.projectDetails = project),
      error: (err) => console.error('Error fetching project details:', err)
    });
  }

  goBack(){
    this.router.navigate(['portfolio']);
  }
  
}
