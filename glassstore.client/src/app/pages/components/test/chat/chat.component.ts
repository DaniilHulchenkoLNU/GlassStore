import { Component } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroment';
import { Chat } from '../../../../models/Chat/Chat';
import { Dialog } from '../../../../models/Chat/Dialog';
import { UserService } from '../../../../services/User.service';
import { User } from '../../../../models/User/User';
import { ACCESS_TOKEN, AuthService } from '../../../../services/Auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  // Добавлено isChatOpen для управления состоянием окна чата
  isChatOpen = false;

  private hubConnection!: signalR.HubConnection;
  private token: string | null = localStorage.getItem(ACCESS_TOKEN);

  chat!: Chat;
  message: string = '';

  constructor(private auth: AuthService, private http: HttpClient, private userServise: UserService, chatServise: Chat) { }

  public get isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  ngOnInit(): void {
    // Подписка на получение пользователя может быть добавлена здесь, если необходимо
  }

  startChat() {
    this.isChatOpen = true; // Открытие окна чата

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

    this.hubConnection.on('ReceiveMessage', (chat) => {
      this.chat = chat;
    });
    
  }

  sendMessage() {
    if (this.message) {
      const dialog: Dialog = { message: this.message };
      this.chat.dialog.push(dialog);
      this.hubConnection.invoke('SendMessage', this.chat)
        .catch(err => console.error(err));
    }
  }

  disconnect(): void {
    this.isChatOpen = false; // Закрытие окна чата
    this.hubConnection.stop()
      .catch(err => console.error(err.toString()));
  }
}
