import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { Persona } from './persona';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-formulario',
	templateUrl: './formulario.component.html',
	styleUrls: ['./formulario.component.css']
})

export class FormularioComponent implements OnInit
{
	formulario : FormGroup;
	personas : Persona[] = [];
	personaMod : Persona | null = null;
	duracionSnackbar : number = 5000;

	constructor(private snackBar : MatSnackBar)
	{
		// Creación del formulario con FormControls y Validators
		this.formulario = new FormGroup({
			nombre : new FormControl("", [Validators.required, Validators.minLength(3)]),
			apellidos : new FormControl("", [Validators.required,  Validators.minLength(3)]),
			edad : new FormControl("", [Validators.required, Validators.min(0), Validators.max(125)]),
			dni : new FormControl("", [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
			cumpleanos : new FormControl("", Validators.required),
			colorFavorito : new FormControl("", [Validators.required, Validators.minLength(3)]),
			sexo : new FormControl("", Validators.required)
		});
	}

	ngOnInit() : void
	{
	}

	enviar() : void
	{
		// Si el formulario no es válido o se está modificando una persona, salimos de la función
		if (!this.formulario.valid || this.personaMod != null)
		{
			return;
		}

		// Creamos una nueva persona y rellenamos su información
		let persona = new Persona();
		persona.nombre = this.formulario.value.nombre;
		persona.apellidos = this.formulario.value.apellidos;
		persona.edad = this.formulario.value.edad;
		persona.dni = this.formulario.value.dni;
		persona.cumpleanos = this.formulario.value.cumpleanos;
		persona.colorFavorito = this.formulario.value.colorFavorito;
		persona.sexo = this.formulario.value.sexo;

		// Añadimos la persona al array y limpiamos el formulario
		this.personas.push(persona);
		this.formulario.reset();

		this.snackBar.open("Formulario enviado", "Aceptar", { duration : this.duracionSnackbar });
	}

	eliminar(event : MouseEvent, persona : Persona) : void
	{
		// Eliminamos la persona empezando a iterar desde el final del array
		// para evitar problemas por usar splice()
		for (let i = this.personas.length -1; i >= 0; i--)
		{
			if (this.personas[i] == persona)
			{
				this.personas.splice(i, 1);
			}
		}

		// Si se estaba modificando la persona en cuestión, limpiamos el
		// formulario y asignamos el valor null a personaMod
		if (this.personaMod != null && this.personaMod == persona)
		{
			this.formulario.reset();
			this.personaMod = null;
		}

		this.snackBar.open("La persona " + persona.nombre + " " + persona.apellidos + " ha sido eliminada", "Aceptar", { duration : this.duracionSnackbar });
	}

	modificar(event : MouseEvent, persona : Persona) : void
	{
		// Para modificar a una persona, nos guardamos una copia de la misma en personaMod
		// y volcamos sus datos en el formulario. En el archivo HTML comprobaremos
		// si cada una de las personas a mostrar en la lista corresponde con
		// personaMod. Si es el caso, mostraremos directamente los valores que
		// se están escribiendo en tiempo real en el formulario
		this.formulario.controls["nombre"].setValue(persona.nombre);
		this.formulario.controls["apellidos"].setValue(persona.apellidos);
		this.formulario.controls["edad"].setValue(persona.edad);
		this.formulario.controls["dni"].setValue(persona.dni);
		this.formulario.controls["cumpleanos"].setValue(persona.cumpleanos);
		this.formulario.controls["colorFavorito"].setValue(persona.colorFavorito);
		this.formulario.controls["sexo"].setValue(persona.sexo);

		this.personaMod = persona;
	}

	terminarModificacion(event : MouseEvent, persona : Persona) : void
	{
		// Para terminar de modificar a una persona, la buscamos
		// en el array de personas y aplicamos los nuevos datos
		// que estén introducidos en el formulario. Después, limpiamos
		// el formulario y asignamos el valor null a personaMod
		for (let p of this.personas)
		{
			if ( p == persona )
			{
				p.nombre = this.formulario.value.nombre;
				p.apellidos = this.formulario.value.apellidos;
				p.edad = this.formulario.value.edad;
				p.dni = this.formulario.value.dni;
				p.cumpleanos = this.formulario.value.cumpleanos;
				p.colorFavorito = this.formulario.value.colorFavorito;
				p.sexo = this.formulario.value.sexo;

				this.formulario.reset();
				this.personaMod = null;

				this.snackBar.open("La persona " + persona.nombre + " " + persona.apellidos + " ha sido modificada", "Aceptar", { duration : this.duracionSnackbar });

				break;
			}
		}
	}
}