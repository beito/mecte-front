import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { RawEntryInterface } from 'src/app/interfaces/entry-class';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  apiURL = `${environment.apiUrl}/profile/entry/`;

  constructor(private http: HttpClient) {}
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getEntries(historyId: number, search: string, dateFilter: Date | undefined): Observable<any> {
    const userId = JSON.parse(localStorage.getItem("user")!).id;
    let params = `userId=${userId}`;

    if (historyId) {
      params += `&historyId=${historyId}`
    }

    if (search) {
      params += `&search=${search}`
    }

    if (dateFilter) {
      params += `&date=${dateFilter}`;
    }
    
    return this.http
      .get<any>(`${this.apiURL}entries?${params}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  createEntry(entry: RawEntryInterface): Observable<RawEntryInterface> {
    return this.http
      .post<RawEntryInterface>(
        this.apiURL + 'entry',
        JSON.stringify(entry),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  createEntryComment(entry: any): Observable<any> {
    return this.http
      .post<any>(
        this.apiURL + 'comment',
        JSON.stringify(entry),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
