import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeatherService {
  url = 'http://api.openweathermap.org/data/2.5/weather';
  appId = '098ddd40529f42d5a8bd6144af2fc01f'
  constructor(
    private http: HttpClient,
  ) {}

   
  getWeatherByCityName(name, code) {
    return this.http.get(`${this.url}?q=${name},${code}&APPID=${this.appId}`);
  }

  getWeatherByCoord(lat:number, lon:number) {
    return this.http.get(`${this.url}?lat=${lat}&lon=${lon}&APPID=${this.appId}`);
  } 

}