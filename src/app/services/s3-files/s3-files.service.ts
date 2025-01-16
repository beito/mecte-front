import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class S3FilesService {
  uploadS3URL = environment.uploadS3URL;
  downloadS3URL = environment.downloadS3URL;

  constructor(private http: HttpClient) { }

  getPresignedUploadURL(logNamespace: any, fileExt: any): Observable<any> {
    const fileParams = {
      folder: "nexia",
      fileName: logNamespace,
      fileExtension: fileExt
    };
    return this.http.post<any>(
      this.uploadS3URL, 
      JSON.stringify(fileParams), {
        headers: new HttpHeaders().set('aws', 'true')
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  getPresignedDownloadURL(filePath: string): Observable<any> {
    const fileParams = {
      filePath
    };
    return this.http.post<any>(
      this.downloadS3URL, 
      JSON.stringify(fileParams), {
        headers: new HttpHeaders().set('aws', 'true')
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  uploadFileAWSS3(fileuploadurl: any, file: any) {
    const req = new HttpRequest(
      'PUT',
      fileuploadurl,
      file, 
      {
        headers: new HttpHeaders().set('Content-Type', 'multipart/form-data').set('aws', 'true'),
        reportProgress: true,
        responseType: 'json'
      });
    return this.http.request(req);
  }

  downloadfileAWSS3(fileuploadurl: string): Observable<Blob> {
    return this.http.get(fileuploadurl, {
      responseType: 'blob',
      headers: new HttpHeaders().set('aws', 'true')
    });
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