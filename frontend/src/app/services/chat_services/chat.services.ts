import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  sendPrompt(prompt: string): Observable<string> {
    const formData = new FormData();
    formData.append('prompt', prompt);
    return this.http.post<{ response: string }>(`${this.apiUrl}/chat`, formData).pipe(
      map(response => response.response),
      catchError(error => throwError(() => new Error(`Failed to send prompt: ${error.message}`)))
    );
  }

  // Included for potential future use with file uploads
  sendPromptWithFile(prompt: string, file: File): Observable<string> {
    if (!file) {
      return throwError(() => new Error('No file provided'));
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('prompt', prompt);
    return this.http.post<{ response: string }>(`${this.apiUrl}/chat_with_file`, formData).pipe(
      map(response => response.response),
      catchError(error => throwError(() => new Error(`Failed to process file and prompt: ${error.message}`)))
    );
  }
}