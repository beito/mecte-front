
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AsignaturasInterface, RawAsignaturasInterface } from 'src/app/interfaces/asignaturas-class';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAsignaturasDT(paginationParams: any): Observable<AsignaturasInterface> {
    let params = `limit=${paginationParams.limit}&skip=${paginationParams.skip}`;
    if (paginationParams.order_by) {
      params += `&sort=${paginationParams.order_by}`;
      params += `&order=${(paginationParams.order_asc) ? "ASC" : "DESC"}`;
    }
    if (paginationParams.search_word) {
      params += `&search=${paginationParams.search_word}`;
    }
    return this.http
      .get<AsignaturasInterface>(`${this.apiURL}asignaturas/data-table?${params}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getAsignaturas(): Observable<AsignaturasInterface> {
    return this.http
      .get<AsignaturasInterface>(this.apiURL + 'asignaturas')
      .pipe(retry(1), catchError(this.handleError));
  }

  getAsignatura(id: any): Observable<AsignaturasInterface> {
    return this.http
      .get<AsignaturasInterface>(this.apiURL + 'asignaturas/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  downloadTemplate(): Observable<Blob> {
    return this.http.get(`${this.apiURL}asignaturas/template`, {
      responseType: 'blob'
    });
  }

  createAsignatura(asignatura: RawAsignaturasInterface): Observable<AsignaturasInterface> {
    return this.http
      .post<AsignaturasInterface>(
        this.apiURL + 'asignaturas',
        JSON.stringify(asignatura),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateAsignatura(id: any, asignatura: RawAsignaturasInterface): Observable<AsignaturasInterface> {
    return this.http
      .patch<AsignaturasInterface>(
        this.apiURL + 'asignaturas/' + id,
        JSON.stringify(asignatura),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteAsignatura(id: any): Observable<any> {
    return this.http
      .delete<any>(
        this.apiURL + 'asignaturas/' + id,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  uploadAsignaturas(asignaturas: Array<AsignaturasInterface>) { 
    return this.http
      .post<AsignaturasInterface>(
        this.apiURL + 'upload/asignaturas',
        JSON.stringify(asignaturas),
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
