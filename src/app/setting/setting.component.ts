import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { UnderscoreService } from '../services/underscore.service'

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

  constructor(private router: Router, private weatherService: WeatherService, private _helper: UnderscoreService) {
    //localStorage.clear();
    this.cities = JSON.parse(localStorage.getItem('cities')) || [];
  }

  addCity(){
    this.error = '';
    this.weatherService.getWeatherByCityName(this.name, this.code).subscribe(
      (res:any) => { 
        let newCity = {
          name: res.name,
          code: res.sys.country,
        }
        if( !this._helper.findWhere(this.cities, newCity)){
          this.cities.push(newCity);
          localStorage.setItem('cities', JSON.stringify(this.cities));
          this.router.navigate(['weather']);
        } else {
          this.error = 'City already added'
          setTimeout(()=>this.error = '', 2000)
        }
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
