import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent  {
  appName = "N2F"
  activeRedirection = environment.activeRedirection;
 }
