import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlassService } from '../../../services/Glass.service';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { TestService } from '../../../services/Test.service';
import { TestRoutingModule } from './test-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../../services/User.service';
import { AdminChatComponent } from './admin-chat/admin-chat.component';




@NgModule({
  declarations: [
    ChatComponent,
    AdminChatComponent
  ],
  imports: [
    CommonModule,
    //TestRoutingModule,
    FormsModule,
    //MatCardModule,
    //MatFormFieldModule,
    //MatInputModule,
    //MatButtonModule,
  ],
  exports: [ChatComponent],
  providers: [TestService, UserService],
})
export class TestModule { }
