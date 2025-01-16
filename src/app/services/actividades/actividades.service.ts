
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ActividadInterface, RawActividadInterface } from 'src/app/interfaces/actividades-class';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getActividadesDT(paginationParams: any): Observable<ActividadInterface> {
    let params = `limit=${paginationParams.limit}&skip=${paginationParams.skip}`;
    if (paginationParams.order_by) {
      params += `&sort=${paginationParams.order_by}`;
      params += `&order=${(paginationParams.order_asc) ? "ASC" : "DESC"}`;
    }
    if (paginationParams.search_word) {
      params += `&search=${paginationParams.search_word}`;
    }
    return this.http
      .get<ActividadInterface>(`${this.apiURL}actividades/data-table?${params}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getActividades(): Observable<ActividadInterface> {
    return this.http
      .get<ActividadInterface>(this.apiURL + 'actividades')
      .pipe(retry(1), catchError(this.handleError));
  }

  getActividad(id: any): Observable<ActividadInterface> {
    return this.http
      .get<ActividadInterface>(this.apiURL + 'actividades/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  downloadTemplate(): Observable<Blob> {
    return this.http.get(`${this.apiURL}actividades/template`, {
      responseType: 'blob'
    });
  }

  createActividad(actividad: RawActividadInterface): Observable<ActividadInterface> {
    return this.http
      .post<ActividadInterface>(
        this.apiURL + 'actividades',
        JSON.stringify(actividad),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateActividad(id: number, actividad: RawActividadInterface): Observable<ActividadInterface> {
    return this.http
      .patch<ActividadInterface>(
        this.apiURL + 'actividades/' + id,
        JSON.stringify(actividad),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteActividad(id: number): Observable<any> {
    return this.http
      .delete<any>(
        this.apiURL + 'actividades/' + id,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  uploadActividades(actividades: Array<ActividadInterface>) { 
    return this.http
      .post<ActividadInterface>(
        this.apiURL + 'upload/actividades',
        JSON.stringify(actividades),
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
