import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public student: Student;
  public myForm: FormGroup;
  public validationMessages;


  constructor(private studentService: StudentService, private fb: FormBuilder) {
    this.student = {
      name: "",
      controlNumber: "",
      age: 0,
      career: "",
      curp: "",
      email: "",
      nip:0
    }

    this.myForm = this.fb.group(
      {
        cn: ["", Validators.compose([Validators.minLength(8), Validators.pattern('^[0-9]+$'), Validators.required])],
        name: ["", Validators.required],
        curp: ["", Validators.compose([Validators.pattern('^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$'), Validators.required])],
        age: [0, Validators.compose([Validators.min(17), Validators.required])],
        nip: [0, Validators.compose([Validators.min(10), Validators.max(9999), Validators.required])],
        email: ["", Validators.compose([Validators.email, Validators.required])],
        career: ["", Validators.required],
        photo: [""],
      }
    );

    this.validationMessages = {
      'cn':[
        {type: 'required', message:"El número de control es obligatorio"},
        {type: 'minLength', message:"El número de control puede que este mal formado"},
        {type: 'pattern', message:"El número de control debe solo tener números"} 
      ],
      'name':[
        {type: 'required', message:"El nombre es obligatorio"} 
      ],
      'curp':[
        {type: 'required', message:"El CURP es obligatorio"}, 
        {type: 'pattern', message:"El CURP esta mal formado"},
      ],
      'age':[
        {type: 'required', message:"La edad es obligatorio"},
        {type: 'min', message:"La edad minima es 17"}, 
      ],
      'nip':[
        {type: 'required', message:"El NIP es obligatorio"},
        {type: 'min', message:"El tamaño minimo es de 2 digitos"},
        {type: 'max', message:"El tamaño maximo del nim es de 4 digitos"} 
      ],
      'email':[
        {type: 'required', message:"El email es obligatorio"},
        {type: 'email', message:"El email esta malformado"} 
      ],
      'career':[
        {type: 'required', message:"El email es obligatorio"} 
      ]
    }
  } 

  public newStudent(){
    this.student = {
      name: this.myForm.controls['name'].value,
      controlNumber: this.myForm.controls['cn'].value,
      age: this.myForm.controls['age'].value,
      career: this.myForm.controls['career'].value,
      curp: this.myForm.controls['curp'].value,
      email: this.myForm.controls['email'].value,
      nip: this.myForm.controls['nip'].value,
      photo: this.myForm.controls['photo'].value
    }

    this.studentService.newStudent(this.student)
  }

}
