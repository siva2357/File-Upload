import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectUpload } from 'src/app/Front-End/core/model/project.model';
import { ProjectUploadService } from 'src/app/Front-End/core/service/project-upload.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  isPortfolio: boolean = false;
  projects: ProjectUpload[] = [];
  categories: string[] = ['All', 'Art Concepts', '3D Environment', '3D Animations', 'Game Development', 'AR/VR'];
  selectedCategory: string = 'All';

  projectsByCategory: { [key: string]: ProjectUpload[] } = {};
  

  constructor(private projectService: ProjectUploadService,private router:Router) { }

  ngOnInit(): void {
    this.loadProjects('All');
  }


  loadProjects(category: string): void {
    this.projectService.getAllProjects().subscribe(projects => {
      if (category === 'All') {
        this.projects = projects;
        this.projectsByCategory = this.groupProjectsByCategory(projects);
      } else {
        this.projectsByCategory = this.groupProjectsByCategory(projects);
      }
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.loadProjects(category);
  }

  private groupProjectsByCategory(projects: ProjectUpload[]): { [key: string]: ProjectUpload[] } {
    const grouped: { [key: string]: ProjectUpload[] } = {
      'Art Concepts': [],
      '3D Environment': [],
      '3D Animations': [],
      'Game Development': [],
      'AR/VR': []
    };
    projects.forEach(project => {
      if (grouped[project.projectType]) {
        grouped[project.projectType].push(project);
      }
    });
    return grouped;
  }



  viewDetails(project: ProjectUpload): void {
    if (!project || !project._id) {
      console.error('Project ID is missing or invalid');
      return;
    }
    this.router.navigateByUrl(`project-details/${project._id}`);
  }
  

  goToUploadPage(){
    this.router.navigate(['post-project']);
  }

  goToManageProjectPage(){
    this.router.navigate(['manage-project']);
  }

}
