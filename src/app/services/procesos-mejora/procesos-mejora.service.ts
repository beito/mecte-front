
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ProcesoMejoraInterface, RawProcesoMejoraInterface } from 'src/app/interfaces/proceso-mejora-class';

@Injectable({
  providedIn: 'root'
})
export class ProcesosMejoraService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getProcesosMejoraDT(paginationParams: any): Observable<ProcesoMejoraInterface> {
    let params = `limit=${paginationParams.limit}&skip=${paginationParams.skip}`;
    if (paginationParams.order_by) {
      params += `&sort=${paginationParams.order_by}`;
      params += `&order=${(paginationParams.order_asc) ? "ASC" : "DESC"}`;
    }
    if (paginationParams.search_word) {
      params += `&search=${paginationParams.search_word}`;
    }
    return this.http
      .get<ProcesoMejoraInterface>(`${this.apiURL}procesos-mejora/data-table?${params}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getProcesosMejora(): Observable<ProcesoMejoraInterface> {
    return this.http
      .get<ProcesoMejoraInterface>(this.apiURL + 'procesos-mejora')
      .pipe(retry(1), catchError(this.handleError));
  }

  getProcesoMejora(id: any): Observable<ProcesoMejoraInterface> {
    return this.http
      .get<ProcesoMejoraInterface>(this.apiURL + 'procesos-mejora/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  downloadTemplate(): Observable<Blob> {
    return this.http.get(`${this.apiURL}procesos-mejora/template`, {
      responseType: 'blob'
    });
  }

  createProcesoMejora(procesoMejora: RawProcesoMejoraInterface): Observable<ProcesoMejoraInterface> {
    return this.http
      .post<ProcesoMejoraInterface>(
        this.apiURL + 'procesos-mejora',
        JSON.stringify(procesoMejora),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateProcesoMejora(id: any, procesoMejora: RawProcesoMejoraInterface): Observable<ProcesoMejoraInterface> {
    return this.http
      .patch<ProcesoMejoraInterface>(
        this.apiURL + 'procesos-mejora/' + id,
        JSON.stringify(procesoMejora),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteProcesoMejora(id: any): Observable<any> {
    return this.http
      .delete<any>(
        this.apiURL + 'procesos-mejora/' + id,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  uploadProcesosMejora(procesoMejora: Array<ProcesoMejoraInterface>) { 
    return this.http
      .post<ProcesoMejoraInterface>(
        this.apiURL + 'upload/procesos-mejora',
        JSON.stringify(procesoMejora),
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
