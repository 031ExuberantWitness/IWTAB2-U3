import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  private students: Student[];

  constructor() {
    this.students = [
      {
        controlNumber: "18401150",
        age: 20,
        career: "ISC",
        curp: "LOQP000730HTNPPNA",
        email: "dalopezqu@ittepic.edu.mx",
        name: "Daniel López Quintero",
        nip: 1212,
        photo: "https://picsum.photos/600/?random=1"
      },
      {
        controlNumber: "05110481",
        age: 22,
        career: "ISC",
        curp: "LOQP000000HTNPPNA",
        email: "dalopezqu@ittepic.edu.mx",
        name: "Daniel [Redacted]",
        nip: 1212,
        photo: "https://picsum.photos/600/?random=2"
      }
    ];
  }

  public getStudents(): Student[]{
    return this.students;
  }

  public getStudentByControlNumber(cn: string): Student | undefined{
    /*let student: Student = 
    {
      controlNumber: "",
      age: 0,
      career: "",
      curp: "",
      name: "",
      email: "",
      nip: 0,
      photo: ""
    }

    this.students.forEach(element  => {
      if(element.controlNumber ==cn){
        student = element;
      }
    });
    return student;*/

    return this.students.find(
      elem => {
        return elem.controlNumber === cn;
      }
    );
  }

  public newStudent(student: Student): Student[]{
    this.students.push(student);
    return this.students;
  }

  public deleteStudent(pos: number): Student[]{
    this.students.splice(pos, 1);
    return this.students;
  }

  public updateStudent(pos: number, student: Student): Student[]{
    this.students[pos] = student;
    return this.students;
  }
}
