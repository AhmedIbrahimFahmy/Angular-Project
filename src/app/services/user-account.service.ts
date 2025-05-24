import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../shared/api-endpoints';
import { Observable } from 'rxjs';
import { UserExamResult } from '../models/userExamResult';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(private http:HttpClient) { }

  // get all exam results
  getAllExamResults(): Observable<UserExamResult[]>{
    let token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<UserExamResult[]>(API_ENDPOINTS.GET_USER_EXAMS, {headers: headers});
  }

  // take part in exam

  // submit exam's answers

}
