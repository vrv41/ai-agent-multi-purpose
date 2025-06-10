import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Chat } from "./chat/chat";
import { FileUpload } from './file-upload/file-upload';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, Chat,FileUpload],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'VRV AI Assistant';
  activeTab: string = 'general';
  ngOnInit(): void {}
}
