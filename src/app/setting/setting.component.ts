import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})

export class SettingComponent {

  name: string;
  code: string;
  error: string;
  
  cities = [];

  constructor(private router: Router, private weatherService: WeatherService) {
    //localStorage.clear();
    this.cities = JSON.parse(localStorage.getItem('cities')) || [];
  }

  addCity(){
    this.error = '';
    this.weatherService.getWeatherByCityName(this.name, this.code).subscribe(
      (res) => { console.log(res)
        this.cities.push({
          name: this.name,
          code: this.code,
        });
        localStorage.setItem('cities', JSON.stringify(this.cities));
        this.router.navigate(['weather']);
      },
      err => {
        this.error = err.error.message;
        console.log(err.error.message);
      }
    )
  }

  removeCity(name){
    this.cities.map((city, i)=>{
      if (city.name == name) {
        this.cities.splice(i,1);
        localStorage.setItem('cities', JSON.stringify(this.cities));
      }
    })
  }
}
