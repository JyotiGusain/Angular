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

 constructor(private studentService:StudentService) { }

  studentsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();


  students: Observable<Student[]>;
  student : Student=new Student();
  deleteMessage=false;
  studentList:any;
  isUpdated = false;


  ngOnInit() {
    this.isUpdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };
    this.studentService.getStudentList().subscribe(data =>{
    this.students =data;
    this.dtTrigger.next();
    })
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage=true;
          this.studentService.getStudentList().subscribe(data =>{
            this.students =data
            })
        },
        error => console.log(error));
  }


  editStudent(student){
    this.isUpdated = false;
    this.student=student;
  }

  studentUpdateForm=new FormGroup({
    id:new FormControl(),
    firstName:new FormControl(),
    lastName:new FormControl(),
    email:new FormControl(),
    branch:new FormControl(),
    phoneNumber:new FormControl()
  });

  updateStudent(upStudent){
   this.student=new Student();
   this.student.id=this.StudentId.value;
   this.student.firstName=this.StudentFirstName.value;
   this.student.lastName=this.StudentLastName.value;
   this.student.email=this.StudentEmail.value;
   this.student.branch=this.StudentBranch.value;
   this.student.phoneNumber=this.StudentPhoneNumber.value;
   console.log(this.StudentBranch.value);

   this.studentService.updateStudent(this.student.id, this.student).subscribe(
    data => {
      this.isUpdated = true;
      this.studentService.getStudentList().subscribe(data =>{
        this.students =data;
        })
    },
    error => console.log(error));
  }

  get StudentFirstName(){
    return this.studentUpdateForm.get('firstName');
  }
  get StudentLastName(){
      return this.studentUpdateForm.get('lastName');
    }

  get StudentEmail(){
    return this.studentUpdateForm.get('email');
  }

  get StudentBranch(){
    return this.studentUpdateForm.get('branch');
  }

  get StudentId(){
    return this.studentUpdateForm.get('id');
  }

  get StudentPhoneNumber(){
   return this.studentUpdateForm.get('phoneNumber');
  }

  changeIsUpdate(){
    this.isUpdated=false;
  }
}
