import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  private baseUrl = 'http://localhost:5109/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  submitChallenge(challengeData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Question/GenerateQuestion`, challengeData);
  }
  

  getQuestion(id: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Question/GetQuestion`, JSON.stringify({ id }), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
}
