
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { SeguimientosInterface, RawSeguimientosInterface } from 'src/app/interfaces/seguimientos-class';

@Injectable({
  providedIn: 'root'
})
export class SeguimientosService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getSeguimientosDT(paginationParams: any): Observable<SeguimientosInterface> {
    let params = `limit=${paginationParams.limit}&skip=${paginationParams.skip}`;
    if (paginationParams.order_by) {
      params += `&sort=${paginationParams.order_by}`;
      params += `&order=${(paginationParams.order_asc) ? "ASC" : "DESC"}`;
    }
    if (paginationParams.search_word) {
      params += `&search=${paginationParams.search_word}`;
    }
    return this.http
      .get<SeguimientosInterface>(`${this.apiURL}seguimientos/data-table?${params}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getSeguimientos(): Observable<SeguimientosInterface> {
    return this.http
      .get<SeguimientosInterface>(this.apiURL + 'seguimientos')
      .pipe(retry(1), catchError(this.handleError));
  }

  getSeguimiento(id: any): Observable<SeguimientosInterface> {
    return this.http
      .get<SeguimientosInterface>(this.apiURL + 'seguimientos/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  downloadTemplate(): Observable<Blob> {
    return this.http.get(`${this.apiURL}seguimientos/template`, {
      responseType: 'blob'
    });
  }

  createSeguimiento(seguimiento: RawSeguimientosInterface): Observable<SeguimientosInterface> {
    return this.http
      .post<SeguimientosInterface>(
        this.apiURL + 'seguimientos',
        JSON.stringify(seguimiento),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateSeguimiento(id: any, seguimiento: RawSeguimientosInterface): Observable<SeguimientosInterface> {
    return this.http
      .patch<SeguimientosInterface>(
        this.apiURL + 'seguimientos/' + id,
        JSON.stringify(seguimiento),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteSeguimiento(id: any): Observable<any> {
    return this.http
      .delete<any>(
        this.apiURL + 'seguimientos/' + id,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  uploadSeguimientos(seguimientos: Array<SeguimientosInterface>) { 
    return this.http
      .post<SeguimientosInterface>(
        this.apiURL + 'upload/seguimientos',
        JSON.stringify(seguimientos),
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
