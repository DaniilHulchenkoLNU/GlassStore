import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { BasketComponent } from './basket/basket.component';
import { UserService } from '../../../services/User.service';
import { UserInfoComponent } from './user-info/user-info.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';






@NgModule({
  declarations: [
    OrdersComponent,
    BasketComponent,
    UserInfoComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,


    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [],
  providers: [UserService],
})
export class UserModule { }
