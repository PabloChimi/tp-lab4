import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer: ElementRef | undefined;

  messages: any[] = [];
  messageText: string = '';
  currentUserName: string = '';  // Nombre del usuario actual

  constructor(private chatService: ChatService, private authService: AuthenticationService) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnInit() {
    this.chatService.getMessages().subscribe((messages) => {
      console.log(messages)
      this.messages = messages;
    });

    // Obtener el nombre del usuario actual desde el servicio de autenticación
    this.currentUserName = this.authService.getUserLoggedName();
  }

  sendMessage() {
    if (this.messageText.trim()) {
      const message = {
        userName: this.currentUserName,
        text: this.messageText,
        date: new Date() // Agregar la fecha
      };
      this.chatService.sendMessage2(message);
      this.messageText = '';
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    if (this.messagesContainer) {
      const element = this.messagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }

  isMyMessage(message: any): boolean {
    return message.userName === this.currentUserName;
  }
}



// import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { ChatService } from '../../services/chat.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { AuthenticationService } from '../../services/authentication.service';

// @Component({
//   selector: 'app-chat',
//   standalone: true,
//   imports: [ CommonModule, FormsModule ],
//   templateUrl: './chat.component.html',
//   styleUrl: './chat.component.css'
// })
// export class ChatComponent implements OnInit, AfterViewChecked  {
//   @ViewChild('messagesContainer') messagesContainer: ElementRef | undefined;

//   messages: any[] = [];
//   messageText: string = '';

//   // messages: { userName: string; text: string }[] = [];
//   // messageText: string = '';

//   constructor(private chatService: ChatService) {}

//   ngAfterViewChecked() {        
//     this.scrollToBottom();        
//   }

//   ngOnInit() {
//     this.chatService.getMessages().subscribe((messages) => {
//       this.messages = messages;
//     });
//   }

//   sendMessage() {
//     if (this.messageText.trim()) {
//       this.chatService.sendMessage(this.messageText);
//       this.messageText = '';
//       this.scrollToBottom();
//     }
//   }
  
//   scrollToBottom(): void {
//     if (this.messagesContainer) {
//       const element = this.messagesContainer.nativeElement;
//       element.scrollTop = element.scrollHeight;
//     }
//   }

// }
