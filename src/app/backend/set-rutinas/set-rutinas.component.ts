import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Rutina} from 'src/app/models';

import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-set-rutinas',
  templateUrl: './set-rutinas.component.html',
  styleUrls: ['./set-rutinas.component.scss'],
})

export class SetRutinasComponent  implements OnInit {

  rutinas: Rutina[] = [];
  
   newRutina: Rutina = {
    titulo: '',
    descripcion: '',
    desarrollo: '',
    id: this.firestoreservice.getId(),
    fecha: new Date()
  };



   enableNewRutina = false; 

private path = 'rutinas/';

loading: any;

  constructor(public menucontroler: MenuController,
              public firestoreservice: FirestoreService,
              public toastController: ToastController,
              public alertController: AlertController,
              public loadingController: LoadingController) { }

  ngOnInit() {
    this.getRutinas();
  }

  openMenu() {
    console.log('open menu');
    this.menucontroler.toggle('principal');
  }

guardarrutina() {
  this.presentLoading();
  this.firestoreservice.createDoc(this.newRutina, this.path, this.newRutina.id).then( res => {
    this.loading.dismiss();
    this.presentToast('Registro Guardado Correctamente')
  }).catch( error => { 
    this.presentToast('No se Guardo Registro')
  });

}

getRutinas(){
  this.firestoreservice.getCollection<Rutina>(this.path).subscribe( res => {
      this.rutinas = res;
  });
  }

  async deleteRutina(rutina: Rutina) {
  
    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: 'Estas Seguro de Eliminar  Este Comentario',
      buttons: [
        {
          text: 'cancelar',
          role: 'calcel',
          cssClass: 'normal',
          handler: (blash) => {
          console.log('Confirm Cancel: blash');
          }
        }, {
          text: 'OK',
           handler: () => {
            console.log('Confirm Okay');
              this.firestoreservice.deleteDoc(this.path, rutina.id). then( res => {
              this.presentToast('Eliminado con Exito');
              this.loadingController.dismiss();
          }).catch( error => {
              this.presentToast('No se Elimino');
            });
          }
        }
      ]
    });
await alert.present();
}



  nuevo() {
    this.enableNewRutina = true;
    this.newRutina = {
      titulo: '',
      descripcion: '',
      desarrollo: '',
      id: this.firestoreservice.getId(),
      fecha: new Date()
    };
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'Guardando...',
    });
    await this.loading.present();
  
  }
  
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: 'success',
      duration: 2000,
      color: 'light'
      
    });
    toast.present();
  
    
  }
  
  }
  
