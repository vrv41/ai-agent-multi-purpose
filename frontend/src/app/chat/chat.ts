import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '../services/chat_services/chat.services';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'
})
export class Chat {
  prompt = new FormControl('');
  messages:any = [];
  selectedFile: File | null = null;
  @ViewChild('chatMessages') chatMessages!: ElementRef<HTMLDivElement>;

  constructor(private chatService: ChatService) {}
ngOnInit(): void {
  // this.scrollToBottom();
  const defaultMessage = 'Hello, I am your AI assistant. How can I help you today?';
  this.messages.push({message:defaultMessage,userType:1 ,timestamp:new Date()});
}
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files && input.files.length > 0 ? input.files[0] : null;
  }

  sendMessage(): void {
    
    const userPrompt = this.prompt.value?.trim() || '';
    if (!userPrompt) {
      this.messages.push({message:'Please enter a prompt.',userType:1 ,timestamp:new Date()});
      this.scrollToBottom();
      return;
    }

    this.messages.push({message:userPrompt,userType:2,timestamp:new Date()});
    this.messages.push({message:'',userType:1,timestamp:new Date(),isTyping:true});
    console.log(this.messages);
    if (this.selectedFile) {
      this.chatService.sendPromptWithFile(userPrompt, this.selectedFile).subscribe({
        next: (response: string) => {
          this.messages = this.cleanMessages(this.messages);
          this.messages.push({message:response,userType:1 ,timestamp:new Date()});
          this.selectedFile = null;
          (document.getElementById('fileInput') as HTMLInputElement).value = '';
          this.scrollToBottom();
        },
        error: (err) => {
          this.messages = this.cleanMessages(this.messages);
          this.messages.push({message:err.message,userType:1,timestamp:new Date()});
          console.error('Chat error:', err);
          this.scrollToBottom();
        }
      });
    } else {
      this.chatService.sendPrompt(userPrompt).subscribe({
        next: (response: string) => {
          this.messages = this.cleanMessages(this.messages);
          this.messages.push({message:response,userType:1 ,timestamp:new Date()});
          // this.messages.push('🤖 AI: ' + response);
          this.scrollToBottom();
        },
        error: (err) => {
          this.messages = this.cleanMessages(this.messages);
          this.messages.push({message:err.message,userType:1 ,timestamp:new Date()});
          // this.messages.push('🤖 AI: Error: ' + err.message);
          console.error('Chat error:', err);
          this.scrollToBottom();
        }
      });
    }
    this.prompt.setValue('');
  }
  cleanMessages(messages:any) {
    return messages
        .filter((msg: { isTyping: any; }) => !msg.isTyping)  // Remove objects with isTyping: true
        .map((msg: { [x: string]: any; isTyping: any; }) => {
            const { isTyping, ...rest } = msg;  // Remove isTyping property from remaining objects
            return rest;
        });
}

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatMessages) {
        this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
      }
    }, 0);
  }
}
