export interface ProjectUpload {
      _id?: string;
      file: { fileName: string; url: string };  // Changed from Array to Object
      projectTitle: string;
      projectType: string;
      softwares: string;
      tags: string;
      projectDescription: string;
      createdAt:Date;
  };

  