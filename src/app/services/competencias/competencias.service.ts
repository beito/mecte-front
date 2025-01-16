
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { CompetenciasInterface, RawCompetenciasInterface } from 'src/app/interfaces/competencias-class';

@Injectable({
  providedIn: 'root'
})
export class CompetenciasService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getCompetenciasDT(paginationParams: any): Observable<CompetenciasInterface> {
    let params = `limit=${paginationParams.limit}&skip=${paginationParams.skip}`;
    if (paginationParams.order_by) {
      params += `&sort=${paginationParams.order_by}`;
      params += `&order=${(paginationParams.order_asc) ? "ASC" : "DESC"}`;
    }
    if (paginationParams.search_word) {
      params += `&search=${paginationParams.search_word}`;
    }
    return this.http
      .get<CompetenciasInterface>(`${this.apiURL}competencias/data-table?${params}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getCompetencias(): Observable<CompetenciasInterface> {
    return this.http
      .get<CompetenciasInterface>(this.apiURL + '/competencias')
      .pipe(retry(1), catchError(this.handleError));
  }

  getCompetencia(id: any): Observable<CompetenciasInterface> {
    return this.http
      .get<CompetenciasInterface>(this.apiURL + 'competencias/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  downloadTemplate(): Observable<Blob> {
    return this.http.get(`${this.apiURL}competencias/template`, {
      responseType: 'blob'
    });
  }

  createCompetencia(competencia: RawCompetenciasInterface): Observable<CompetenciasInterface> {
    return this.http
      .post<CompetenciasInterface>(
        this.apiURL + 'competencias',
        JSON.stringify(competencia),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateCompetencia(id: any, competencia: RawCompetenciasInterface): Observable<CompetenciasInterface> {
    return this.http
      .patch<CompetenciasInterface>(
        this.apiURL + 'competencias/' + id,
        JSON.stringify(competencia),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteCompetencia(id: any): Observable<any> {
    return this.http
      .delete<any>(
        this.apiURL + 'competencias/' + id,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  uploadCompetencias(competencias: Array<CompetenciasInterface>) { 
    return this.http
      .post<CompetenciasInterface>(
        this.apiURL + 'upload/competencias',
        JSON.stringify(competencias),
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
