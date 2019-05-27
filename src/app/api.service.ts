import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api: string = 'http://68.183.58.83:8000/api/v1/'

  constructor( private http: HttpClient) { }

  getCampeones(): Observable<any>{
    return this.http.get(`${this.api}campeon/`)
  }

  createCampeon(item : any) : Observable<any>{
    console.log(item)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }
    return this.http.post(`${this.api}campeon/`,item,httpOptions);
  }
  deleteCampeon(id:number){
      return this.http.delete(`${this.api}campeon/${id}`);
  }

  updateChamp(item:any,id:number){
    console.log("iddd: ",id)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }
    return this.http.put(`${this.api}campeon/${id}`,item,httpOptions);

  }
}
