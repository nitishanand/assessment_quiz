import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventemitterService {
  // dataStr = new EventEmitter();
  data;

  constructor() { }

  /* sendMessage(data) {
    this.dataStr.emit(data);
  } */
}
