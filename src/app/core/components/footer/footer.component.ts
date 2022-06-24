import { environment } from '../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  @Input() appName: string;

  version: string = environment.version;

  constructor() { }

  ngOnInit() {
  }

}