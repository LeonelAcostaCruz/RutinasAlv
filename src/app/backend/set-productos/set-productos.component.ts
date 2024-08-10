import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Producto } from 'src/app/models';
import { FirestorageService } from 'src/app/services/firestorage.service';

import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-set-productos',
  templateUrl: './set-productos.component.html',
  styleUrls: ['./set-productos.component.scss'],
})


export class SetProductosComponent  implements OnInit {

productos: Producto[] = [] ;

  newProducto: Producto = {
    nombre: '',
    descripcion: '',
    precio: '',
    foto: '',
    id: this.firestoreservice.getId(),
    fecha: new Date()
    };

    enableNewProducto = false; 

  private  path = 'productos/';

newImage = '';
 newFile = '';


  loading: any;

  constructor(public menucontroler: MenuController,
             public firestoreservice: FirestoreService,
             public toastController: ToastController,
             public alertController: AlertController,
             public loadingController: LoadingController,
             public firestorageService: FirestorageService){ }


  ngOnInit() {
    this.getProductos();

  }

  openMenu() {
    console.log('open menu');
    this.menucontroler.toggle('principal');
  }

async guardarproducto(){
    this.presentLoading();
       const path = 'Productos';
       const name = this.newProducto.nombre;
       const res = await this.firestorageService.uploadImage(this.newFile, path, name);
       this.newProducto.foto = res;
       this.firestoreservice.createDoc(this.newProducto, this.path, this.newProducto.id).then( res => {
        this.loading.dismiss();
        this.presentToast('Registro Guardado Correctamente')
  }).catch( error => { 
    this.presentToast('No se Guardo Registro')
  });

}
getProductos(){
  this.firestoreservice.getCollection<Producto>(this.path).subscribe( res => {
    this.productos = res;

  });
}
async deleteProducto(producto: Producto) {

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
            this.firestoreservice.deleteDoc(this.path, producto.id). then( res => {
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


nuevo(){
this.enableNewProducto = true;
this.newProducto = {
  nombre: '',
  descripcion: '',
  precio: '',
  foto: '',
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

  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
       reader.onload = ((image) => {
       this.newProducto.foto = image.target?.result as string;
        
      });
      reader.readAsDataURL(event.target.files[0]);
     }
       

  }
  
  }
  