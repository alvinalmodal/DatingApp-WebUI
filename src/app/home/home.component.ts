import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onRegisterToggle(): void {
    this.registerMode = !this.registerMode;
  }

}
