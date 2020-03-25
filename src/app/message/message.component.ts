import { Component, OnInit } from '@angular/core';

export const enum Level { INFO ="INFO", ERROR="ERROR" }

export const MSG_ERROR = "Error - ";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {

  v_show: boolean;
  v_text: string;
  v_level: Level;

  constructor() { 
    this.init();
  }
 
  ngOnInit() {   }

  init(){
    this.v_show=false;
    this.v_text="";
    this.v_level=Level.INFO;
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

  hide(){
    setTimeout(() => { this.init() }, 3000);
  }

}