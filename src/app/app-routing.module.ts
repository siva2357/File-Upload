import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './Front-End/view/Pages/portfolio/portfolio.component';
import { PostProjectComponent } from './Front-End/view/Pages/post-project/post-project.component';
import { ManageProjectComponent } from './Front-End/view/Pages/manage-project/manage-project.component';
import { ProjectDetailsComponent } from './Front-End/view/Pages/project-details/project-details.component';
import { EditProjectDetailsComponent } from './Front-End/view/Pages/edit-project-details/edit-project-details.component';

const routes: Routes = [
  { path: 'portfolio', component: PortfolioComponent, title: 'Portfolio page' },
  { path: 'post-project', component: PostProjectComponent, title: 'Post Project Page' },
  { path: 'manage-project', component: ManageProjectComponent, title: 'Manage project' },
  { path: 'view-project/:id', component: EditProjectDetailsComponent, title: 'View project' },
  { path: 'project-details/:id', component: ProjectDetailsComponent, title: 'Project details' },
  { path: '**', redirectTo: 'portfolio' }, // Fallback rou
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
