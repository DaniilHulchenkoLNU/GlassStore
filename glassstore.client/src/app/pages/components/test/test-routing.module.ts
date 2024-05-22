import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { AdminChatComponent } from './admin-chat/admin-chat.component';



const routes: Routes = [
  { path: "Chat", component: ChatComponent },
  { path: "", component: AdminChatComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
