export class Persona {
    nombre : string;
    apellidos : string;
    edad : number;
    dni : string;
    cumpleanos : Date;
    colorFavorito : string;
    sexo : string;
    
    constructor()
    {
        this.nombre = "";
        this.apellidos = "";
        this.edad = 0;
        this.dni = "";
        this.cumpleanos = new Date();
        this.colorFavorito = "";
        this.sexo = "";
    }
}