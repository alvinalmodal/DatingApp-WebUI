import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  login(): void{
    this.authService.login(this.model).subscribe(next =>{
      this.alertify.success('Welcome! You are now logged in.');
    }, error => {
      this.alertify.error(error);
    });
  }

  loggedIn(): any{
    return this.authService.loggedIn();
  }

  logout(): void{
    localStorage.removeItem('token');
    this.alertify.success('You are now logged out.');
  }

}
