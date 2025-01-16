
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { DecanosInterface, RawDecanosInterface } from 'src/app/interfaces/decanos-class';

@Injectable({
  providedIn: 'root'
})
export class DecanosService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getDecanosDT(paginationParams: any): Observable<DecanosInterface> {
    let params = `limit=${paginationParams.limit}&skip=${paginationParams.skip}`;
    if (paginationParams.order_by) {
      params += `&sort=${paginationParams.order_by}`;
      params += `&order=${(paginationParams.order_asc) ? "ASC" : "DESC"}`;
    }
    if (paginationParams.search_word) {
      params += `&search=${paginationParams.search_word}`;
    }
    return this.http
      .get<DecanosInterface>(`${this.apiURL}decanos/data-table?${params}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getDecanos(): Observable<DecanosInterface> {
    return this.http
      .get<DecanosInterface>(this.apiURL + 'decanos')
      .pipe(retry(1), catchError(this.handleError));
  }

  getDecano(id: any): Observable<DecanosInterface> {
    return this.http
      .get<DecanosInterface>(this.apiURL + 'decanos/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  downloadTemplate(): Observable<Blob> {
    return this.http.get(`${this.apiURL}decanos/template`, {
      responseType: 'blob'
    });
  }

  createDecano(decano: RawDecanosInterface): Observable<DecanosInterface> {
    return this.http
      .post<DecanosInterface>(
        this.apiURL + 'decanos',
        JSON.stringify(decano),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateDecano(id: any, decano: RawDecanosInterface): Observable<DecanosInterface> {
    return this.http
      .put<DecanosInterface>(
        this.apiURL + 'decanos/' + id,
        JSON.stringify(decano),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteDecano(id: any): Observable<any> {
    return this.http
      .delete<any>(
        this.apiURL + 'decanos/' + id,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  uploadDecanos(decanos: Array<DecanosInterface>) { 
    return this.http
      .post<DecanosInterface>(
        this.apiURL + 'upload/decanos',
        JSON.stringify(decanos),
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
