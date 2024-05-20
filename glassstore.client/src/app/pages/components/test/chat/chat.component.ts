import { Component } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroment';
import { Chat } from '../../../../models/Chat/Chat';
import { Dialog } from '../../../../models/Chat/Dialog';
import { UserService } from '../../../../services/User.service';
import { User } from '../../../../models/User/User';
import { ACCESS_TOKEN } from '../../../../services/Auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  
  private hubConnection!: signalR.HubConnection;
  private token: string | null = localStorage.getItem(ACCESS_TOKEN);

  chat!: Chat;
  messages: string[] = [];
  message: string = '';
  user!: User;

  constructor( private http: HttpClient, private userServise: UserService) {}
 
  ngOnInit(): void {
    this.userServise.getuser().subscribe((data) => this.user = data)
  }

  startChat() {
    
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl[0]}/chathub`, {
        accessTokenFactory: () => this.token ? this.token : ''
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));

    //this.chatService.addMessageListener();
    this.hubConnection.on('ReceiveMessage', (chat) => {
      this.chat = chat;
      for (var i = 0; i < this.chat.dialog.length; i++) {
        this.messages.push(this.chat.dialog[i].message);
      }


      // Добавьте логику для отображения сообщений чата

      

    });
}

  sendMessage() {
    if (this.message) {
      //this.chatService.sendMessage(this.message);

      const dialog: Dialog = { message: this.message }
      this.chat.dialog[0].senderUser?.email
      this.chat.dialog.push(dialog)
      this.hubConnection.invoke('SendMessage', this.chat)
        .catch(err => console.error(err));
      
    }
  }
}
