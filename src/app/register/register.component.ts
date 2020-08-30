import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() wasCancelled = new EventEmitter();
  user: User;
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(): void {
    this.registerForm = this.formBuilder.group(
      {
        gender: ['male'],
        username: ['', Validators.required],
        knownAs: ['', Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(100),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup): any {
    return form.get('password').value === form.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  onRegister(): any {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);

      this.authService.register(this.user).subscribe(
        () => {
          this.alertify.success('Registration successful.');
        },
        (error) => {
          this.alertify.error(error);
        },
        () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(['/members']);
          });
        }
      );
    }
  }

  onCancel(): void {
    this.wasCancelled.emit();
  }
}
