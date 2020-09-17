import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: User[];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles(): void {
    this.adminService.getUserWithRoles().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
