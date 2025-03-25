import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl = 'http://localhost:5109/api/Question'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  submitChallenge(challengeData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/GenerateQuestion`, challengeData);
  }
  getMyChallenges(): Observable<any> {
    return this.http.get(`${this.baseUrl}/MyChallanges`);
  }
}
