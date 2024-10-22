import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit{

  userName: string = "";

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(() => {
      this.userName = this.authService.getUserLoggedName();
    });    
  }

  constructor(private firestore: AngularFirestore, private authService: AuthenticationService) {}

  getMessages() {
    return this.firestore.collection('messages', ref => ref.orderBy('date')).valueChanges();
  }

  async sendMessage(text: string) {
    const user = await this.authService.getUserLoggedName();
    return this.firestore.collection('messages').add({
      text,
      userName: user,
      timestamp: new Date()
    });
  }

  async sendMessage2(message: {
    userName: string;
    text: string;
    date: Date;
}) {
    const user = await this.authService.getUserLoggedName();
    console.log("agrego")
    console.log()
    return this.firestore.collection('messages').add({
      text: message.text,
      userName: message.userName,
      date: new Date().toLocaleString()
    });
  }
}
