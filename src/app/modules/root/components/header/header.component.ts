import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() appName: string;

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit() {
  }

}