import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
private apiUrl = 'https://2fvfxspq-5109.inc1.devtunnels.ms/api/dashboard';
 
  constructor(private http: HttpClient) {}
 
  getRecentChallenges(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recent-challenges`);
  }
 
  getExpertiseTopics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/expertise-topics`);
  }
 
  getGradeClass(grade: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-grade-class/${grade}`);
  }
 
  getSubjectClass(subject: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-subject-class/${subject}`);
  }
  getAllChallenges(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all-challenges`);
  }
}