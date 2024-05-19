import { Component } from '@angular/core';
import { UserService } from '../../../../services/User.service';
import { Basket } from '../../../../models/User/Basket';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent {
  constructor(private userService: UserService) { }

  public basket!: Basket;

  ngOnInit(): void { this.getbasket(); }

  getbasket(){
    this.userService.getuserbasket().subscribe((data) => { this.basket = data });
  }
}
