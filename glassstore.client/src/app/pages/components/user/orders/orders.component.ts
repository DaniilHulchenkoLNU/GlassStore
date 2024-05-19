import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../../../services/Auth.service';
import { environment } from '../../../../enviroment';
import { UserService } from '../../../../services/User.service';
import { Orders } from '../../../../models/User/Orders';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  //constructor(private http: HttpClient) { }

  //chat!: string[];

  //getchat(): void {
  //  this.http.get<string[]>('/test/chat').subscribe( data => {
  //    this.chat = data;
  //  });

  //}





  //addchat(message: string) {
  //  console.log(message);
  //  this.http.post(`/test/chatadd`, { message } ).subscribe();
  //}

  public orders: Orders[] = [];

  constructor(private http: HttpClient, private userServise: UserService) { }

  ngOnInit() {
    this.userServise.getuserorders().subscribe((data) => { this.orders = data });
    //this.getchat()
  }
}
