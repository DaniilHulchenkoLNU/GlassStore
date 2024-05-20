import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/Auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent implements OnInit {


  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {}

  public get isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }


  title = 'glassstore.client';
}
