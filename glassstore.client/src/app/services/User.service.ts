import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User/User';
import { Basket } from '../models/User/Basket';
import { Orders } from '../models/User/Orders';


@Injectable(/*{providedIn: 'root'}*/)
export class UserService {

  constructor(private http: HttpClient) {
  }

  getuser(): Observable<User> {
    return this.http.get<User>(`/user/GetUser`);
  }

  getuserorders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(`/user/GetUserOrders`);
  }

  getuserbasket(): Observable<Basket> {
    return this.http.get<Basket>(`/user/GetUserBasket`);
  }

  addtobasket(glassId: string): Observable<boolean> {
    return this.http.post<boolean>(`/user/AddToBasket`, { id: glassId });
  }
}



