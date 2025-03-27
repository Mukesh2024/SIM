import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  //private baseUrl = 'https://2fvfxspq-5109.inc1.devtunnels.ms/api/Question'; // Replace with your actual API URL
 
  private baseUrl = environment.baseURL + "/Question"
  constructor(private http: HttpClient) { }

  submitChallenge(challengeData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/GenerateQuestion`, challengeData);
  }
  getMyChallenges(): Observable<any> {
    return this.http.get(`${this.baseUrl}/MyChallanges`);
  }
}
