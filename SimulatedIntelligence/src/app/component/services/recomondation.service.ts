import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private baseUrl = 'http://localhost:5109/api'; 

  constructor(private http: HttpClient) { }

  getRecommadation(questionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Question/RecommendationOnQuestion`, questionData);
  }
}
