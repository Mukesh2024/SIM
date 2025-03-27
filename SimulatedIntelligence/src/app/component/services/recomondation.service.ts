import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private baseUrl = environment.baseURL

  constructor(private http: HttpClient) { }

  getRecommadation(questionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Question/RecommendationOnQuestion`, questionData, { responseType: 'text' });
  }
}
