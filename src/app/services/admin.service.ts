import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  url = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUserWithRoles(): any {
    return this.http.get(`${this.url}admin/usersWithRoles`);
  }
}
