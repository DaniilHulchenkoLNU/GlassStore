import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chat } from '../../../../models/Chat/Chat';
import { ChatService } from '../../../../services/Chat.service';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css']
})
  import { Component, OnInit, OnDestroy } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ACCESS_TOKEN } from '../../../../services/Auth.service';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css']
})
export class AdminChatComponent implements OnInit, OnDestroy {
  private token: string | null = localStorage.getItem(ACCESS_TOKEN);
  private hubConnection: signalR.HubConnection | null = null;
  public chats: any[] = [];
  public currentChat: any = null;
  public message: string = '';


  ngOnInit(): void {
    this.startConnection();
  }

  ngOnDestroy(): void {
    this.stopConnection();
  }

  private startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('/chathub', {
        accessTokenFactory: () => this.token ? this.token : ''
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connected!');
        this.getAllChats();
        this.hubConnection?.on('ReceiveMessage', (message) => {
          if (this.currentChat && this.currentChat.id === message.chatId) {
            this.currentChat.dialog.push(message);
          }
        });
      })
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  private stopConnection() {
    this.hubConnection?.stop().catch(err => console.log('Error while stopping connection: ' + err));
  }

  private getAllChats() {
    this.hubConnection?.invoke('GetAllChats')
      .then(chats => this.chats = chats)
      .catch(err => console.log('Error while getting chats: ' + err));
  }

  public openChat(chatId: string) {
    this.hubConnection?.invoke('GetChatById', chatId)
      .then(chat => {
        this.currentChat = chat;
        this.message = '';
      })
      .catch(err => console.log('Error while opening chat: ' + err));
  }

  public sendMessage() {
    if (this.currentChat && this.message.trim()) {
      const message = {
        chatId: this.currentChat.id,
        content: this.message,
        senderUserId: 'admin',
        dateTime: new Date()
      };
      this.hubConnection?.invoke('SendMessage', message)
        .then(() => this.message = '')
        .catch(err => console.log('Error while sending message: ' + err));
    }
  }
}
