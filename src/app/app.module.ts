import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostProjectComponent } from './Front-End/view/Pages/post-project/post-project.component';
import { ManageProjectComponent } from './Front-End/view/Pages/manage-project/manage-project.component';
import { PortfolioComponent } from './Front-End/view/Pages/portfolio/portfolio.component';
import { ProjectTableComponent } from './Front-End/view/shared/project-table/project-table.component';
import { ProjectDetailsComponent } from './Front-End/view/Pages/project-details/project-details.component';
import { FileUploadComponent } from './Front-End/view/shared/file-upload/file-upload.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { EditProjectDetailsComponent } from './Front-End/view/Pages/edit-project-details/edit-project-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PostProjectComponent,
    ManageProjectComponent,
    PortfolioComponent,
    ProjectTableComponent,
    ProjectDetailsComponent,
    FileUploadComponent,
    EditProjectDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule, // Ensure routing is included
    AngularFireModule.initializeApp(environment.firebaseConfig), // Use legacy compatibility mode
    AngularFireStorageModule, // Use storage services
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
