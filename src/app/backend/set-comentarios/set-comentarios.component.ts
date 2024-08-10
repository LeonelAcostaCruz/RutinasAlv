import { Text } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Comentario } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-set-comentarios',
  templateUrl: './set-comentarios.component.html',
  styleUrls: ['./set-comentarios.component.scss'],
})


export class SetComentariosComponent  implements OnInit {
    
  comentarios: Comentario[] = [];
  
  newComentario: Comentario = {
    nombre: '',
    correo: '',
    comentario: '',
    id: this.firestoreservice.getId(),
    fecha: new Date()
  };

  enableNewComentario = false; 

private path = 'comentarios/';

loading: any;


  constructor(public menucontroler: MenuController,
            public firestoreservice: FirestoreService,
            public loadingController: LoadingController,
            public toastController: ToastController,
            public alertController: AlertController ) { }

  ngOnInit() {
    this.getComentarios();
  }
  
openMenu() {
  console.log('open menu');
  this.menucontroler.toggle('principal');
}

guardarcomentario() {
  this.presentLoading();
  this.firestoreservice.createDoc(this.newComentario, this.path, this.newComentario.id).then( res => {
    this.loading.dismiss();
    this.presentToast('Registro Guardado Correctamente')
  }).catch( error => { 
    this.presentToast('No se Guardo Registro')
  });

}

getComentarios() {
  this.firestoreservice.getCollection<Comentario>(this.path).subscribe( res => {
    this.comentarios = res;
  });
  }
  async deleteComentario(comentario: Comentario) {

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
                  this.firestoreservice.deleteDoc(this.path, comentario.id). then( res => {
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
    this.enableNewComentario = true;
    this.newComentario = {
      nombre: '',
      correo: '',
      comentario: '',
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

