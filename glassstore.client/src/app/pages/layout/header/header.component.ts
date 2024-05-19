import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthService } from '../../../services/Auth.service';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public urls: string[] = [];
  private IgnoreUrls = ['GlassInfo/:id',];


  public get isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }
  public logout() {
    this.auth.logout()
  }

  constructor(private router: Router, public auth: AuthService) {


    const routes: Routes = this.router.config;

    routes.forEach(route => {
      if (route.path !== '**' && route.path !== '' && route.path !== undefined) {
        //if (!route.path.includes('/')) {
          this.urls.push(route.path);        
        //}
        
      }
    });

    //this.urls = this.urls.filter(url => !this.IgnoreUrls.includes(url));
    //this.urls.reduce('GlassInfo')
  }


  oninit(): void {}

}
