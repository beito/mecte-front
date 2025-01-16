
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { FacultadesInterface, RawFacultadesInterface } from 'src/app/interfaces/facultades-class';

@Injectable({
  providedIn: 'root'
})
export class FacultadesService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getFacultadesDT(paginationParams: any): Observable<FacultadesInterface> {
    let params = `limit=${paginationParams.limit}&skip=${paginationParams.skip}`;
    if (paginationParams.order_by) {
      params += `&sort=${paginationParams.order_by}`;
      params += `&order=${(paginationParams.order_asc) ? "ASC" : "DESC"}`;
    }
    if (paginationParams.search_word) {
      params += `&search=${paginationParams.search_word}`;
    }
    return this.http
      .get<FacultadesInterface>(`${this.apiURL}facultades/data-table?${params}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getFacultades(): Observable<FacultadesInterface> {
    return this.http
      .get<FacultadesInterface>(this.apiURL + 'facultades')
      .pipe(retry(1), catchError(this.handleError));
  }

  getFacultad(id: any): Observable<FacultadesInterface> {
    return this.http
      .get<FacultadesInterface>(this.apiURL + 'facultades/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  downloadTemplate(): Observable<Blob> {
    return this.http.get(`${this.apiURL}facultades/template`, {
      responseType: 'blob'
    });
  }

  createFacultad(facultad: RawFacultadesInterface): Observable<FacultadesInterface> {
    return this.http
      .post<FacultadesInterface>(
        this.apiURL + 'facultades',
        JSON.stringify(facultad),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateFacultad(id: any, facultad: RawFacultadesInterface): Observable<FacultadesInterface> {
    return this.http
      .patch<FacultadesInterface>(
        this.apiURL + 'facultades/' + id,
        JSON.stringify(facultad),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteFacultad(id: any): Observable<any> {
    return this.http
      .delete<any>(
        this.apiURL + 'facultades/' + id,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  uploadFacultades(facultades: Array<FacultadesInterface>) { 
    return this.http
      .post<FacultadesInterface>(
        this.apiURL + 'upload/facultades',
        JSON.stringify(facultades),
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
