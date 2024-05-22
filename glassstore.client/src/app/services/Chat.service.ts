import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../models/Chat/Chat';
import { BehaviorSubject, Observable } from 'rxjs';
import * as signalR from '@microsoft/signalr';
import { environment } from '../enviroment';
import { ACCESS_TOKEN } from './Auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private token: string | null = localStorage.getItem(ACCESS_TOKEN);

  ngInit(): void {}

  getChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>('user/GetChats');
  }

  private hubConnection: signalR.HubConnection | null = null;
  public messages: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public chats: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public currentChat: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  //public async startConnectionHub(): Promise<Chat> {
  //  this.hubConnection = new signalR.HubConnectionBuilder()
  //    .withUrl(`${environment.apiUrl[0]}/chathub`, {
  //      accessTokenFactory: () => this.token ? this.token : ''
  //    })
  //    .configureLogging(signalR.LogLevel.Information)
  //    .build();

  //  try {
  //    await this.hubConnection.start();
  //    console.log('Connection started');
  //  } catch (err) {
  //    console.log('Error while starting connection: ' + err);
  //    throw err; // Прокидываем ошибку дальше
  //  }

  //  return new Promise<Chat>((resolve, reject) => {
  //    this.hubConnection.on('ReceiveMessage', (res: Chat) => {
  //      if (res.id && res.dialog) {
  //        resolve(res);
  //      } else {
  //        reject(new Error('Received message does not have required properties'));
  //      }
  //    });
  //  });
  //}

  //public startConnection(): void {
  //  this.hubConnection = new signalR.HubConnectionBuilder()
  //    .withUrl('/chathub')  // URL к вашему хабу SignalR
  //    .withAutomaticReconnect()
  //    .build();

  //  this.hubConnection
  //    .start()
  //    .then(() => {
  //      console.log('Connected!');
  //      this.getAllChats();
  //      this.hubConnection?.on('ReceiveMessage', (message) => {
  //        const currentMessages = this.messages.value;
  //        currentMessages.push(message);
  //        this.messages.next(currentMessages);
  //      });
  //    })
  //    .catch(err => console.log('Error while starting connection: ' + err));
  //}

  public stopConnection(): void {
    this.hubConnection?.stop().catch(err => console.log('Error while stopping connection: ' + err));
  }

  public getAllChats(): void {
    this.hubConnection?.invoke('GetAllChats')
      .then(chats => this.chats.next(chats))
      .catch(err => console.log('Error while getting chats: ' + err));
  }

  public openChat(chatId: string): void {
    this.hubConnection?.invoke('GetChatById', chatId)
      .then(chat => {
        this.currentChat.next(chat);
        this.messages.next(chat.dialog);
      })
      .catch(err => console.log('Error while opening chat: ' + err));
  }

  public sendMessage(chatId: string, content: string): void {
    const message = { content, senderUserId: 'admin', dateTime: new Date() };
    this.hubConnection?.invoke('SendMessage', chatId, message)
      .catch(err => console.log('Error while sending message: ' + err));
  }

}
