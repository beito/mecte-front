import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlertHistoryService {
  apiURL = `${environment.apiUrl}/profile/history/action`;


  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAlertHistory(paginationParams: any): any {
    let params = `limit=${paginationParams.limit}&skip=${paginationParams.skip}`;
    return this.http.get<any>(`${this.apiURL}?${params}`)
  }
}
