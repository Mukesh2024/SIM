import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  // private baseUrl = 'https://2fvfxspq-5109.inc1.devtunnels.ms/api'; // Replace with your actual API URL
  private baseUrl = environment.baseURL

  constructor(private http: HttpClient) { }

  submitChallenge(challengeData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Question/GenerateQuestion`, challengeData);
  }


  getQuestion(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Question/GetQuestion?model=${id}`);
  }
  getQuestionsAns(id: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/Question/GetQuestionWithAnswer?model=${id}`);
  }

  saveUserAnswer(userResponse: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Question/SaveUserAnswer`, userResponse);
  }
}

