import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../enviroment';

@Injectable(
  { providedIn: 'root'}
)
export class TestService {
  private hubConnection!: signalR.HubConnection;

  constructor() { }

  public startConnection = (hubname: string) => {

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl[0]}/${hubname}`)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addMessageListener = () => {
    this.hubConnection.on('ReceiveMessage', (user, message) => {
      console.log(`${user}: ${message}`);
      // Добавьте логику для отображения сообщений чата
    });
  }

  public sendMessage = ( message: string) => {
    this.hubConnection.invoke('SendMessage', message)
      .catch(err => console.error(err));
  }

}
