import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from './enviroment';
import { ACCESS_TOKEN } from './services/Auth.service';
import { WeatherComponent } from './pages/components/weather/weather.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { AuthModule } from './pages/layout/Auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestModule } from './pages/components/test/test.module';




//const { env } = require('process');

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN);
}

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    HeaderComponent,

    

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    AuthModule,

    TestModule,


    //JwtModule.forRoot({
    //  config: {
    //    tokenGetter: () => {
    //      return localStorage.getItem('access_token');
    //    },
    //    allowedDomains: ['example.com'],
    //    disallowedRoutes: ['example.com/auth/login'],
    //  },
    //}),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.apiUrl,
      },
    }),

  ],
  providers: [], // для инжекции сервисов
  bootstrap: [AppComponent]
})
export class AppModule { }
