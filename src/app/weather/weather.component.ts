import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})

export class WeatherComponent {
  cloudyGradation = [ "far fa-sun", "far fa-sun", "fas fa-cloud-sun", "fas fa-cloud", "fas fa-cloud"]
  weatherItems = [];
  cities = JSON.parse(localStorage.getItem('cities')) || [];
  date = new Date().toLocaleString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
  slideIndex: number;
  error: string;
  
  constructor( private weatherService: WeatherService ) {
    
    this.slideIndex = 0;
    if (this.cities.length > 0){
      this.cities.map((city, index)=>{
        weatherService.getWeatherByCityName(city.name, city.code).subscribe(
            res => {
              this.weatherItems[index] = res;
            },
            err => { console.log(err); this.error = 'Getting weather error: ' + err.statusText },
          )
      })
    } else{
      if (navigator !== undefined) {
        navigator.geolocation.getCurrentPosition((location) => {
          weatherService.getWeatherByCoord(location.coords.latitude, location.coords.longitude).subscribe(
            res => {
              this.addFirstItem(res);
            },
            err => { console.log(err); this.error = 'Getting weather error: ' + err.message },
          )
        },
        err => {
          weatherService.getWeatherByCityName('Kazan', 'ru').subscribe(
            res => {
              this.addFirstItem(res);
            },
            err => { console.log(err); this.error = 'Getting weather error: ' + err.message },
          )
          this.error ='To get weather by location, allow access to location data';
          setTimeout(()=>this.error = '', 5000)
        })
      }
    }
  }

  ChangeSlide(index:number){
    this.slideIndex = index;
    for ( var i=0; i<document.getElementsByClassName('tab').length; i++) {
			document.getElementsByClassName('tab')[i].className = i == index ? 'tab ng-scope active ' : 'tab ng-scope';
		}
  }

  addFirstItem(weatherItem){
    this.weatherItems.push(weatherItem);
    this.cities.push({
      name: weatherItem.name,
      code: weatherItem.sys.country,
    })
    localStorage.setItem('cities',JSON.stringify(this.cities));
  }
  
}