
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { CarrerasInterface, RawCarrerasInterface } from 'src/app/interfaces/carreras-class';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getCarrerasDT(paginationParams: any): Observable<CarrerasInterface> {
    let params = `limit=${paginationParams.limit}&skip=${paginationParams.skip}`;
    if (paginationParams.order_by) {
      params += `&sort=${paginationParams.order_by}`;
      params += `&order=${(paginationParams.order_asc) ? "ASC" : "DESC"}`;
    }
    if (paginationParams.search_word) {
      params += `&search=${paginationParams.search_word}`;
    }
    return this.http
      .get<CarrerasInterface>(`${this.apiURL}carreras/data-table?${params}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getCarreras(): Observable<CarrerasInterface> {
    return this.http
      .get<CarrerasInterface>(this.apiURL + 'carreras')
      .pipe(retry(1), catchError(this.handleError));
  }

  getCarrera(id: any): Observable<CarrerasInterface> {
    return this.http
      .get<CarrerasInterface>(this.apiURL + 'carreras/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  downloadTemplate(): Observable<Blob> {
    return this.http.get(`${this.apiURL}carreras/template`, {
      responseType: 'blob'
    });
  }

  createCarrera(carrera: RawCarrerasInterface): Observable<CarrerasInterface> {
    return this.http
      .post<CarrerasInterface>(
        this.apiURL + 'carreras',
        JSON.stringify(carrera),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateCarrera(id: any, carrera: RawCarrerasInterface): Observable<CarrerasInterface> {
    return this.http
      .patch<CarrerasInterface>(
        this.apiURL + 'carreras/' + id,
        JSON.stringify(carrera),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteCarrera(id: any): Observable<any> {
    return this.http
      .delete<any>(
        this.apiURL + 'carreras/' + id,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  uploadCarreras(carreras: Array<CarrerasInterface>) { 
    return this.http
      .post<CarrerasInterface>(
        this.apiURL + 'upload/carreras',
        JSON.stringify(carreras),
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
