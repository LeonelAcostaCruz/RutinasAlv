

export interface Rutina {
titulo: string;
descripcion: string;
desarrollo: string;
id: string;
fecha: Date;
}

export interface Producto {
    nombre: string;
    descripcion: string;
    precio: string;
    foto: string;
    id: string;
    fecha: Date;
    }


    export interface Comentario {
        nombre: string;
        correo: string;
        comentario: string;
        id: string;
        fecha: Date;
        }

    export interface Cliente {
        nombre: string;
        email: string;
        celular: string;
        foto: string;
        referencia: string;
        ubicacion: any;
        uid: any;
        fecha: Date;
        }    