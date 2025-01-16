
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { EvaluacionesInterface, RawEvaluacionesInterface } from 'src/app/interfaces/evaluaciones-class';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionesService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getEvaluacionesDT(paginationParams: any): Observable<EvaluacionesInterface> {
    let params = `limit=${paginationParams.limit}&skip=${paginationParams.skip}`;
    if (paginationParams.order_by) {
      params += `&sort=${paginationParams.order_by}`;
      params += `&order=${(paginationParams.order_asc) ? "ASC" : "DESC"}`;
    }
    if (paginationParams.search_word) {
      params += `&search=${paginationParams.search_word}`;
    }
    return this.http
      .get<EvaluacionesInterface>(`${this.apiURL}evaluaciones/data-table?${params}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getEvaluaciones(): Observable<EvaluacionesInterface> {
    return this.http
      .get<EvaluacionesInterface>(this.apiURL + 'evaluaciones')
      .pipe(retry(1), catchError(this.handleError));
  }

  getEvaluacion(id: any): Observable<EvaluacionesInterface> {
    return this.http
      .get<EvaluacionesInterface>(this.apiURL + 'evaluaciones/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  downloadTemplate(): Observable<Blob> {
    return this.http.get(`${this.apiURL}evaluaciones/template`, {
      responseType: 'blob'
    });
  }

  createEvaluacion(evaluacion: RawEvaluacionesInterface): Observable<EvaluacionesInterface> {
    return this.http
      .post<EvaluacionesInterface>(
        this.apiURL + 'evaluaciones',
        JSON.stringify(evaluacion),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateEvaluacion(id: number, evaluacion: RawEvaluacionesInterface): Observable<EvaluacionesInterface> {
    return this.http
      .patch<EvaluacionesInterface>(
        this.apiURL + 'evaluaciones/' + id,
        JSON.stringify(evaluacion),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteEvaluacion(id: number): Observable<any> {
    return this.http
      .delete<any>(
        this.apiURL + 'evaluaciones/' + id,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  uploadEvaluaciones(evaluaciones: Array<EvaluacionesInterface>) { 
    return this.http
      .post<EvaluacionesInterface>(
        this.apiURL + 'upload/evaluaciones',
        JSON.stringify(evaluaciones),
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
