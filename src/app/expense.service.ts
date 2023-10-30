import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  [x: string]: any;
  
  apiUrl = 'http://localhost:8080/';
  
 
  constructor(private http: HttpClient) { }



postRequest(url: string, param: {}) {
  return this.http.post(this.apiUrl + url, param, httpOptions)
   
}
getExpenses(): Observable<any[]> {

  return this.http.get<any[]>(`${this.apiUrl}/expenses`);
}

getRequest(url: string, param: {}) {

 return this.http.get(this.apiUrl + url,param);
   
}

}
