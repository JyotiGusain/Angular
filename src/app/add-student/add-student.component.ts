import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Student } from '../student';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private studentService:StudentService) { }

  student : Student=new Student();
  submitted = false;

  ngOnInit() {
    this.submitted=false;
  }

  studentSaveForm=new FormGroup({
    firstName:new FormControl('' , [Validators.required , Validators.minLength(5) ] ),
    email:new FormControl('',[Validators.required,Validators.email]),
    phoneNumber:new FormControl(),
    lastName:new FormControl(),
    branch:new FormControl()
  });

  saveStudent(saveStudent){
    this.student=new Student();
    this.student.firstName=this.StudentFirstName.value;
    this.student.lastName=this.StudentLastName.value;
    this.student.email=this.StudentEmail.value;
    this.student.branch=this.StudentBranch.value;
    this.student.phoneNumber=this.StudentPhoneNumber.value;
    this.submitted = true;
    this.save();
  }



  save() {
    this.studentService.createStudent(this.student)
      .subscribe(data => console.log(data), error => console.log(error));
    this.student = new Student();
  }

  get StudentFirstName(){
    return this.studentSaveForm.get('firstName');
  }
  get StudentLastName(){
      return this.studentSaveForm.get('lastName');
    }

  get StudentEmail(){
    return this.studentSaveForm.get('email');
  }

  get StudentBranch(){
    return this.studentSaveForm.get('branch');
  }

  get StudentPhoneNumber(){
  return this.studentSaveForm.get('phoneNumber')
  }


  addStudentForm(){
    this.submitted=false;
    this.studentSaveForm.reset();
  }
}
