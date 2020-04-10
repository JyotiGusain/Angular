import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { Observable,Subject } from "rxjs";

import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

 constructor(private studentservice:StudentService) { }

  studentsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();


  students: Observable<Student[]>;
  student : Student=new Student();
  deleteMessage=false;
  studentlist:any;
  isupdated = false;


  ngOnInit() {
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };
    this.studentservice.getStudentList().subscribe(data =>{
    this.students =data;
    this.dtTrigger.next();
    })
  }

  deleteStudent(id: number) {
    this.studentservice.deleteStudent(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage=true;
          this.studentservice.getStudentList().subscribe(data =>{
            this.students =data
            })
        },
        error => console.log(error));
  }


  updateStudent(id: number){
    this.studentservice.getStudent(id)
      .subscribe(
        data => {
          this.studentlist=data
        },
        error => console.log(error));
  }

  studentupdateform=new FormGroup({
    id:new FormControl(),
    firstName:new FormControl(),
    email:new FormControl(),
    branch:new FormControl()
  });

  updateStu(updstu){
    this.student=new Student();
   this.student.id=this.StudentId.value;
   this.student.firstName=this.StudentFirstName.value;
   this.student.lastName=this.StudentLastName.value;
   this.student.email=this.StudentEmail.value;
   this.student.branch=this.StudentBranch.value;
   this.student.phoneNumber=this.StudentPhoneNumber.value;
   console.log(this.StudentBranch.value);


   this.studentservice.updateStudent(this.student.id,this.student).subscribe(
    data => {
      this.isupdated=true;
      this.studentservice.getStudentList().subscribe(data =>{
        this.students =data
        })
    },
    error => console.log(error));
  }

  get StudentFirstName(){
    return this.studentupdateform.get('firstName');
  }
  get StudentLastName(){
      return this.studentupdateform.get('lastName');
    }

  get StudentEmail(){
    return this.studentupdateform.get('email');
  }

  get StudentBranch(){
    return this.studentupdateform.get('branch');
  }

  get StudentId(){
    return this.studentupdateform.get('id');
  }

  get StudentPhoneNumber(){
   return this.studentupdateform.get('phoneNumber');
  }

  changeisUpdate(){
    this.isupdated=false;
  }
}
