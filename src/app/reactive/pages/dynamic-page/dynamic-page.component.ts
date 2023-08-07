import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array([
      ['The Witcher 3', Validators.required],
      ['Cyberpunk 2077', Validators.required],
    ]),
  });

  public newFavoriteGame: FormControl = new FormControl('', Validators.required);

  constructor(private formBuilder: FormBuilder) { }

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  isValidFieldInArray( formArray: FormArray, index: number ): boolean | null {
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }

  getErrorMessage( field: string ): string | null {

    if( !this.myForm.controls[field] ) {
      return null;
    }

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido.';
        case 'minlength':
          return `Este campo requiere al menos ${ errors['minlength'].requiredLength } caracteres.`;
        case 'min':
          return 'El valor mínimo es 0';
        default:
          return 'Error';
      }
    }

    return null;
  }

  addFavoriteGame(): void {

    if (this.newFavoriteGame.invalid) {
      return;
    }

    const newGame = this.newFavoriteGame.value;

    this.favoriteGames.push( this.formBuilder.control(newGame, Validators.required) );

    this.newFavoriteGame.reset();
  }

  onDeleteFavorite( index: number ): void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray ) = this.formBuilder.array([]);
    this.myForm.reset();
  }

}
