import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProjectUpload } from '../model/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectUploadService {
  private projectUploadApiUrl = 'http://localhost:3200/api/project-upload';
  projectList: ProjectUpload[] = [];

  constructor(private http: HttpClient) { }

  // Create a new job post
  createProject(projectUploadData: ProjectUpload): Observable<ProjectUpload> {
    return this.http.post<ProjectUpload>(`${this.projectUploadApiUrl}/project`, projectUploadData).pipe(catchError(this.handleError));
  }

  // Fetch all job posts for recruiter
  getAllProjects(): Observable<ProjectUpload[]> {
    return this.http.get<ProjectUpload[]>(`${this.projectUploadApiUrl}/projects`).pipe(catchError(this.handleError));
  }

  // Fetch job post by ID for recruiter
  getProjectById(id: string): Observable<ProjectUpload> {
    return this.http.get<ProjectUpload>(`${this.projectUploadApiUrl}/project/${id}`).pipe(catchError(this.handleError));
  }

  // Update job post by ID for recruiter
  updateProjectById(id: string, projectUploadData: ProjectUpload): Observable<ProjectUpload> {
    return this.http.put<ProjectUpload>(`${this.projectUploadApiUrl}/project/${id}`, projectUploadData).pipe(catchError(this.handleError));
  }

  // Delete job post by ID for recruiter
  deleteProjectById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.projectUploadApiUrl}/project/${id}`).pipe(catchError(this.handleError));
  }


  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}


