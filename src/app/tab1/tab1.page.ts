import { Component, ViewChild } from '@angular/core';
import { AlertController, IonInput, ToastController } from '@ionic/angular';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public students: Student[];
  @ViewChild('input') input!: IonInput;

  constructor(
    private studentService: StudentService,
    private alertController: AlertController,
    private toastController: ToastController
    ) {
    this.students = this.studentService.getStudents();
  }

  public async deleteStudent(student: number) {
    this.confirmationDialog(
      '¿Desea eliminar este estudainte?',
      () => {
        this.studentService.deleteStudent(0); 
      },
      (respuesta: OverlayEventDetail) => {
        if (respuesta.role === 'cancel') {
          this.input.setFocus();
          this.showToast('Cancelado', 'warning');
        }

        if (respuesta.role === 'confirm') {
          this.input.setFocus();
          this.showToast('Se eliminó', 'success');
        }
      }
    );
  }

  private async confirmationDialog(
    header: string,
    handler?: Function,
    dismissFunction?: Function
  ) {
    const alert = await this.alertController.create({
      header,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          cssClass: 'primary',
          handler: () => {
            if (handler) handler();
          },
        },
      ],
    });
    alert.present();
    alert.onDidDismiss().then((respuesta) => {
      if (dismissFunction) dismissFunction(respuesta);
    });
  }
 
  public async updateStudent(task: number) {
    const alert = await this.alertController.create({
      header: 'Editar tarea',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: StudentService.name,
          placeholder: 'Nombre de la tarea',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Editar',
          handler: async (data) => {
            if (data.name === '' || data.name === null) {
              this.showToast(
                'El nombre de la tarea no puede estar vacío',
                'danger'
              );
              return false;
            }
            if (data.name === this.studentService.getStudents) {
              this.showToast(
                'El nombre de la tarea no puede ser igual al anterior',
                'danger'
              );
              return false;
            }
            this.confirmationDialog(
              '¿Desea editar la tarea?',
              undefined,
              (respuesta: OverlayEventDetail) => {
                if (respuesta.role !== 'confirm') return;
                this.studentService.updateStudent(task, {
                  controlNumber: "18401150",
                  age: 20,
                  career: "ISC",
                  curp: "LOQP000730HTNPPNA",
                  email: "dalopezqu@ittepic.edu.mx",
                  name: "Daniel López Quintero",
                  nip: 1212,
                  photo: "https://picsum.photos/600/?random=1"
                }); 
                alert.dismiss(undefined, 'confirm');
              }
            );
            return false;
          },
        },
      ],
    });
    alert.present();
    alert.onDidDismiss().then((respuesta) => {
      console.log(respuesta);
      if (respuesta.role === 'confirm') {
        this.input.setFocus();
        this.showToast('Tarea editada', 'success');
      }

      if (respuesta.role === 'cancel') {
        this.input.setFocus();
        this.showToast('Operación cancelada', 'warning');
      }
    });
  }

  private async showToast(
    message: string,
    color: 'success' | 'danger' | 'warning'
  ) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 1000,
    });
    toast.present();
  }
}
