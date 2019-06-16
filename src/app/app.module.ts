import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SettingComponent } from './setting/setting.component'
import { WeatherComponent } from './weather/weather.component'
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { WeatherService } from './weather/weather.service';
import { FormsModule } from '@angular/forms';

const appRoutes=[
  {
    path:'',component: WeatherComponent
  },
  {
    path:'setting' , component: SettingComponent
  },
  {
    path:'weather',component: WeatherComponent
  },
  {
    path: '**', redirectTo: 'assignments'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    SettingComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
