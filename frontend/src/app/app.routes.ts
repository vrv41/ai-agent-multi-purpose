import { Routes } from '@angular/router';
import { Chat } from './chat/chat';
import { FileUpload } from './file-upload/file-upload';

export const routes: Routes = [
    { path: '', component: Chat },
    { path: 'upload', component: FileUpload }
  ];
