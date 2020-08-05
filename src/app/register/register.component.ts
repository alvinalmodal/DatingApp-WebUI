import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  @Output() wasCancelled = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onRegister(): any {
    this.authService.register(this.model).subscribe(() => {
      console.log('register successful.');
    }, error => {
      console.log(error);
    });
  }

  onCancel(): void {
    this.wasCancelled.emit();
  }

}
