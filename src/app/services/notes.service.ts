import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NotesService {
  baseUrl:string = "https://routeegypt.herokuapp.com/";
  constructor(private _HttpClient:HttpClient) { }


  getAllNotes(data):Observable<any>{
   return this._HttpClient.post(this.baseUrl+'getUserNotes' , data);
  }
  AddNotes(data):Observable<any>{
    return this._HttpClient.post(this.baseUrl+'addNote' , data);
   }
   deleteNotes(data):Observable<any>{
     let options = {
       headers:new HttpHeaders({

       }),
       body:{
        token:data.token,
        NoteID:data.NoteID,
       }
     }
    return this._HttpClient.delete(this.baseUrl+'deleteNote' , options);
   }

   updateNotes(data):Observable<any>{
    return this._HttpClient.put(this.baseUrl+'updateNote' , data);
   }
}
