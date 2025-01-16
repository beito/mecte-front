
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { PeriodosAcademicosInterface, RawPeriodosAcademicosInterface } from 'src/app/interfaces/periodos-academicos-class';

@Injectable({
  providedIn: 'root'
})
export class PeriodosAcademicosService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getPeriodosAcademicosDT(paginationParams: any): Observable<PeriodosAcademicosInterface> {
    let params = `limit=${paginationParams.limit}&skip=${paginationParams.skip}`;
    if (paginationParams.order_by) {
      params += `&sort=${paginationParams.order_by}`;
      params += `&order=${(paginationParams.order_asc) ? "ASC" : "DESC"}`;
    }
    if (paginationParams.search_word) {
      params += `&search=${paginationParams.search_word}`;
    }
    return this.http
      .get<PeriodosAcademicosInterface>(`${this.apiURL}periodos-academicos/data-table?${params}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getPeriodosAcademicos(): Observable<PeriodosAcademicosInterface> {
    return this.http
      .get<PeriodosAcademicosInterface>(this.apiURL + '/periodos-academicos')
      .pipe(retry(1), catchError(this.handleError));
  }

  getPeriodoAcademico(id: any): Observable<PeriodosAcademicosInterface> {
    return this.http
      .get<PeriodosAcademicosInterface>(this.apiURL + 'periodos-academicos/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  downloadTemplate(): Observable<Blob> {
    return this.http.get(`${this.apiURL}periodos-academicos/template`, {
      responseType: 'blob'
    });
  }

  createPeriodoAcademico(periodoAcademico: RawPeriodosAcademicosInterface): Observable<PeriodosAcademicosInterface> {
    return this.http
      .post<PeriodosAcademicosInterface>(
        this.apiURL + 'periodos-academicos',
        JSON.stringify(periodoAcademico),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updatePeriodoAcademico(id: any, periodoAcademico: RawPeriodosAcademicosInterface): Observable<PeriodosAcademicosInterface> {
    return this.http
      .patch<PeriodosAcademicosInterface>(
        this.apiURL + 'periodos-academicos/' + id,
        JSON.stringify(periodoAcademico),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deletePeriodoAcademico(id: any): Observable<any> {
    return this.http
      .delete<any>(
        this.apiURL + 'periodos-academicos/' + id,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  uploadPeriodosAcademicos(periodosAcademicos: Array<PeriodosAcademicosInterface>) { 
    return this.http
      .post<PeriodosAcademicosInterface>(
        this.apiURL + 'upload/periodos-academicos',
        JSON.stringify(periodosAcademicos),
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
