import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private baseUrl = 'http://localhost:5109/api/Question'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getRecommadation(model: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/Question/RecommendationOnQuestion`, model);
  }
}
