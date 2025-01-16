import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { HistoryInterface, RawHistoryInterface, ReducedHistoryInterface } from '../../interfaces/history-class';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  apiURL = `${environment.apiUrl}/profile/history/`;
  apiURLDashboard = `${environment.apiUrl}/profile/dashboard/`;  

  constructor(private http: HttpClient) {}
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getHistories(paginationParams: any): Observable<HistoryInterface> {
    const userId = JSON.parse(localStorage.getItem("user")!).id;

    let params = `limit=${paginationParams.limit}&skip=${paginationParams.skip}&userId=${userId}`;
    if (paginationParams.order_by) {
      params += `&sort=${paginationParams.order_by}`;
    }
    if (paginationParams.hasOwnProperty('order_asc')) {
      params += `&order=${paginationParams.order_asc}`;
    }
    if (paginationParams.search_word) {
      params += `&search=${paginationParams.search_word}`;
    }
    return this.http
      .get<HistoryInterface>(`${this.apiURL}actions?${params}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getHistoriesCards(search: string, dateFilter: Date | undefined): Observable<HistoryInterface> {
    const searchValues = (search !== "") ? `search=${search}` : "";
    const searchDate = (dateFilter) ? `date=${dateFilter}` : "";
    const finalFilter = (searchValues !== "" && searchDate !== "") ? `?${searchValues}&${searchDate}` : `?${searchValues || searchDate}`;
    return this.http
      .get<HistoryInterface>(`${this.apiURL}actionsCards${finalFilter}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getCompleteHistories(paginationParams: any): Observable<HistoryInterface> {
    let params = `limit=${paginationParams.limit}&skip=${paginationParams.skip}`;
    if (paginationParams.order_by) {
      params += `&sort=${paginationParams.order_by}`;
    }
    if (paginationParams.hasOwnProperty('order_asc')) {
      params += `&order=${paginationParams.order_asc}`;
    }
    if (paginationParams.search_word) {
      params += `&search=${paginationParams.search_word}`;
    }
    return this.http
      .get<HistoryInterface>(`${this.apiURL}actions/complete?${params}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getRecordsWithVerificationStatusOne(): Observable<any> {
    return this.http
      .get<any>(`${this.apiURL}dashboard/registries`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getPeopleRecords(type: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiURL}actions/complete/people-records?type=${type}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getHistoryCountByUserDepartment(): Observable<any> {
    return this.http
      .get<any>(`${this.apiURL}actions/department-count`)
      .pipe(retry(1), catchError(this.handleError));
  }

  countEventsByInstitutionForRecentMonth() {
    return this.http
      .get<any>(`${this.apiURL}actions/monthy-count`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getHistoryInsights(): Observable<any> {
    return this.http
      .get<any>(`${this.apiURL}insights`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getHistoryCatalog(): Observable<ReducedHistoryInterface> {
    return this.http
      .get<ReducedHistoryInterface>(`${this.apiURL}catalogHistory`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getHistoriesInsights(verificationStatusId: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiURLDashboard}verificationInsights?verificationId=${verificationStatusId}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getHistoriesPerDay(verificationStatusId: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiURLDashboard}countPerDay?verificationId=${verificationStatusId}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getAverageClosingTimeForHistory(): Observable<any> {
    return this.http
      .get<any>(`${this.apiURLDashboard}averageClosingTimeForHistory`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getLastVisits(): Observable<any> {
    return this.http
      .get<any>(`${this.apiURLDashboard}lastVisits`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getLastProductors(): Observable<any> {
    return this.http
      .get<any>(`${this.apiURLDashboard}lastProductors`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getLastLegalPerson(): Observable<any> {
    return this.http
      .get<any>(`${this.apiURLDashboard}lastLegalPerson`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getLastCertificationRegistry(): Observable<any> {
    return this.http
      .get<any>(`${this.apiURLDashboard}lastCertificationRegistry`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getLastProducts(): Observable<any> {
    return this.http
      .get<any>(`${this.apiURLDashboard}lastProducts`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getLastEstablishments(): Observable<any> {
    return this.http
      .get<any>(`${this.apiURLDashboard}lastEstablishments`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getHistory(id: number): Observable<HistoryInterface> {
    return this.http
      .get<HistoryInterface>(this.apiURL + 'action/one?id=' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  createHistory(history: RawHistoryInterface): Observable<HistoryInterface> {
    return this.http
      .post<HistoryInterface>(
        this.apiURL + 'action',
        JSON.stringify(history),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateHistory(id: number, history: RawHistoryInterface): Observable<HistoryInterface> {
    return this.http
      .put<HistoryInterface>(
        this.apiURL + 'action?id=' + id,
        JSON.stringify(history),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteHistory(id: number): Observable<any> {
    return this.http
      .delete<any>(
        this.apiURL + 'action?id=' + id,
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
