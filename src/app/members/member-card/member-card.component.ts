import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {}

  sendLike(recipientId: number): void {
    this.userService
      .sendLike(this.authService.decodedToken.nameid, recipientId)
      .subscribe(
        (data) => {
          this.alertify.success(`You have liked : ${this.user.knownAs}`);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
}
