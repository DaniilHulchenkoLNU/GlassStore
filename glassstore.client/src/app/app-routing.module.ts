import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { WeatherComponent } from './pages/components/weather/weather.component';



export const routes: Routes = [
  
  { path: "", component: WeatherComponent },

  {
    path: 'Glasses',
    loadChildren: () => import('./pages/components/glass/glasses.module').then(m => m.GlassesModule)
  },
  {
    path: 'User',
    loadChildren: () => import('./pages/components/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'Test',
    loadChildren: () => import('./pages/components/test/test.module').then(m => m.TestModule)
  },
  //{
  //  path: 'User',
  //  loadChildren: () => import('./pages/components/user/user.module').then(m => m.UserModule)
  //},
  //{ path: "Login", component: LoginComponent }
  
  //{ path: "", component: AppComponent, children: [
  //    { path: "glass", component: GlassComponent }
  //  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Используем метод forRoot для настройки маршрутизации в корневом модуле
  exports: [RouterModule] // Экспортируем RouterModule, чтобы его можно было использовать в других модулях
})
export class AppRoutingModule { }
