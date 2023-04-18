import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  private students: Student[] = [];
  constructor() {
    this.students.push(
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
    );
  }

  public getStudents(): Student[] {
    return this.students;
  }

  public getStudentByControlNumber(controlNumber: string): Student | undefined {
    console.log(this.students, controlNumber)
    return this.students.find(
      (student) => student.controlNumber === controlNumber
    );
  }

  public newStudent(student: Student): Student[] {
    this.students.push(student);
    return this.students;
  }

  public updateStudent(student: Student): Student[] {
    const pos = this.students.findIndex(
      (std) => std.controlNumber === student.controlNumber
    );
    this.students[pos] = student;
    return this.students;
  }

  public deleteStudent(controlNumber: string): Student[] {
    this.students = this.students.filter(
      (student) => student.controlNumber !== controlNumber
    );
    return this.students;
  }
}
