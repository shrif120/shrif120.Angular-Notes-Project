import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NotesService} from 'src/app/services/notes.service';
import jwt_decode from "jwt-decode";
import {FormGroup , FormControl , Validators} from '@angular/forms';
declare let $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading:boolean= false;
  AddNotes: FormGroup;
  editNotes:FormGroup;
   allNotes:any[];
   token;
   decoded;
  constructor(private _Router:Router , private _NotesService:NotesService) {
    try {
      this.token = localStorage.getItem('currentUser');
      this.decoded = jwt_decode(this.token);  
    } catch (error) {
      localStorage.clear();
      this._Router.navigate(['/signin']);
    }
    
    this.showAllNotes();
   
    if(!localStorage.getItem('currentUser')){
          this._Router.navigate(['/signin']);
    }
   
   }


   notesData(){
     let data ={
       title:this.AddNotes.value.title,
       desc:this.AddNotes.value.desc,
       token:this.token,
       citizenID:this.decoded._id
     }
     this._NotesService.AddNotes(data).subscribe((response)=>{
       if(response.message == 'success'){
           $("#AddNote").modal('hide');
           this.showAllNotes();
           this.AddNotes.reset();
       }
       
     })
    
   }

   showAllNotes(){
    
    let data = {
      token:this.token,
       userID:this.decoded._id
     }
    this._NotesService.getAllNotes(data).subscribe((data)=>{
      if(data.message == 'success'){
        this.allNotes = data.Notes;
        this.isLoading = true;
      }else{
        localStorage.clear();
      this._Router.navigate(['/signin']);
      }
      
      
    })
     
    
    
   }
   
  noteId;
   getID(id){
     this.noteId = id;
     console.log(id);
   }

   deleteNote(){
     let data = {
       token:this.token,
       NoteID:this.noteId,
     }
     this._NotesService.deleteNotes(data).subscribe((data)=>{
         if(data.message == 'deleted'){
          $("#DeleteNote").modal('hide');
          this.showAllNotes();
         }
     })
   }
    


   setValue(){
     for (let index = 0; index < this.allNotes.length; index++) {
       if(this.allNotes[index]._id == this.noteId){
          this.AddNotes.controls.title.setValue(this.allNotes[index].title);
          this.AddNotes.controls.desc.setValue(this.allNotes[index].desc);
       }
       
     }
   }
   

   editNotess(){
     let data ={
       title:this.AddNotes.value.title,
       desc:this.AddNotes.value.desc,
       NoteID:this.noteId,
       token:this.token,
     }
     this._NotesService.updateNotes(data).subscribe((data)=>{
      if(data.message=='updated'){
        $("#EditNote").modal('hide');
        this.showAllNotes();
      
      }
     })
   }

  
  ngOnInit(): void {
    this.AddNotes = new FormGroup({
      title:new FormControl(null , Validators.required ),
      desc:new FormControl(null , Validators.required ),
    })
    
  }

}
