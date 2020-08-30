import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { PaginatedResult } from '../models/paginations';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.baseUrl + 'users';
  constructor(private http: HttpClient) {}

  getUsers(page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<
      User[]
    >();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http
      .get<User[]>(this.url, { observe: 'response', params })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.url + '/' + id);
  }

  updateUser(id: number, user: User): any {
    return this.http.put(`${this.url}/${id}`, user);
  }

  setMainPhoto(userId: number, id: number): any {
    return this.http.post(`${this.url}/${userId}/photos/${id}/setMain`, {});
  }

  deletePhoto(userId: number, id: number): any {
    return this.http.delete(`${this.url}/${userId}/photos/${id}`);
  }
}
