import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AdminService } from '../../services/admin.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from '../roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: User[];
  bsModalRef: BsModalRef;

  constructor(
    private adminService: AdminService,
    private modalService: BsModalService
  ) {}

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

  editRolesModal(): void {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...',
      ],
      title: 'Modal with component',
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
