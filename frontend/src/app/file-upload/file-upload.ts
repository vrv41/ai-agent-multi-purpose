import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '../services/chat_services/chat.services';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.scss'
})
export class FileUpload {
  selectedFile: File | null = null;
  prompt: any;
  content: string = '';
  error: string = '';

  constructor(private chatService: ChatService) {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  upload(): void {
    this.content = '';
    this.error = '';
    
    if (!this.prompt) {
      this.error = 'Please enter a prompt';
      return;
    }

    if (this.selectedFile) {
      // Send prompt with file
      this.chatService.sendPromptWithFile(this.prompt, this.selectedFile).subscribe({
        next: (response) => {
          this.content = response;
        },
        error: (err) => {
          this.error = err.message;
        }
      });
    } else {
      // Send text-only prompt
      this.chatService.sendPrompt(this.prompt).subscribe({
        next: (response) => {
          this.content = response;
        },
        error: (err) => {
          this.error = err.message;
        }
      });
    }
  }
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
  
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
  }
  
  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }
  
  removeFile(): void {
    this.selectedFile = null;
  }
}