
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { SubCompetenciasInterface, RawSubCompetenciasInterface } from 'src/app/interfaces/sub-competencias-class';

@Injectable({
  providedIn: 'root'
})
export class SubCompetenciasService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getSubCompetenciasDT(paginationParams: any): Observable<SubCompetenciasInterface> {
    let params = `limit=${paginationParams.limit}&skip=${paginationParams.skip}`;
    if (paginationParams.order_by) {
      params += `&sort=${paginationParams.order_by}`;
      params += `&order=${(paginationParams.order_asc) ? "ASC" : "DESC"}`;
    }
    if (paginationParams.search_word) {
      params += `&search=${paginationParams.search_word}`;
    }
    return this.http
      .get<SubCompetenciasInterface>(`${this.apiURL}sub-competencias/data-table?${params}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getSubCompetencias(): Observable<SubCompetenciasInterface> {
    return this.http
      .get<SubCompetenciasInterface>(this.apiURL + 'sub-competencias')
      .pipe(retry(1), catchError(this.handleError));
  }

  getSubCompetencia(id: any): Observable<SubCompetenciasInterface> {
    return this.http
      .get<SubCompetenciasInterface>(this.apiURL + 'sub-competencias/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  downloadTemplate(): Observable<Blob> {
    return this.http.get(`${this.apiURL}sub-competencias/template`, {
      responseType: 'blob'
    });
  }

  createSubCompetencia(subCompetencia: RawSubCompetenciasInterface): Observable<SubCompetenciasInterface> {
    return this.http
      .post<SubCompetenciasInterface>(
        this.apiURL + 'sub-competencias',
        JSON.stringify(subCompetencia),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateSubCompetencia(id: any, subCompetencia: RawSubCompetenciasInterface): Observable<SubCompetenciasInterface> {
    return this.http
      .patch<SubCompetenciasInterface>(
        this.apiURL + 'sub-competencias/' + id,
        JSON.stringify(subCompetencia),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteSubCompetencia(id: any): Observable<any> {
    return this.http
      .delete<any>(
        this.apiURL + 'sub-competencias/' + id,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  uploadSubCompetencias(subCompetencias: Array<SubCompetenciasInterface>) { 
    return this.http
      .post<SubCompetenciasInterface>(
        this.apiURL + 'upload/sub-competencias',
        JSON.stringify(subCompetencias),
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
