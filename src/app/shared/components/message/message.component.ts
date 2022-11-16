import { Component, OnDestroy, OnInit } from '@angular/core';

export const enum Level { INFO = "INFO", ERROR = "ERROR" }

export const MSG_ERROR = "Error - ";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})

export class MessageComponent implements OnInit, OnDestroy {

  v_show: boolean;
  v_text: string;
  v_level: Level;

  constructor() { }
  
  ngOnInit() { 
    this.init();
  }

  ngOnDestroy(): void {    
    this.hide();
  }
  
  init() {
    this.v_show = false;
    this.v_text = "";
    this.v_level = Level.INFO;
  }
  
  hide() {
    setTimeout(() => { this.init() }, 3000);
  }

  show(level: Level, text: string) {
    this.v_show = true;
    this.v_text = text;
    this.v_level = level;
    this.hide();
  }

  show_info(text: string) {
    this.show(Level.INFO, text);
    this.hide();
  }

  show_error(text: string) {
    this.show(Level.ERROR, MSG_ERROR + text);
    this.hide();
  }

}