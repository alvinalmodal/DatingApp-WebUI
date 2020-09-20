import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  url = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUserWithRoles(): any {
    return this.http.get(`${this.url}admin/usersWithRoles`);
  }

  updateUserRoles(user: User, roles: {}): any {
    return this.http.post(`${this.url}admin/editRoles/${user.userName}`, roles);
  }
}
