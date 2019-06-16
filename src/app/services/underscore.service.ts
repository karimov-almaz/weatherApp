import { Injectable } from '@angular/core';
import { _ } from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class UnderscoreService {

  constructor() { }

  findWhere(array, item) {
    return _.findWhere(array, item);
  }
}
