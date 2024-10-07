import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactive.form';

  form: FormGroup<any>;
  formData? : Data;

  constructor(private fb : FormBuilder) {
    this.form = this.fb.group({
      nom: ['', [Validators.required]],
      roadnumber: ['', [Validators.required, Validators.min(1000), Validators.max(9999)]],
      postalcode: ['', [this.postalCodeValidator]],
      comment: ['', this.commentLengthValidator]
    }, {validators: this.nameInCommentValidator});
    this.form.valueChanges.subscribe(() => {
      this.formData = this.form.value;
    });
  }

  postalCodeValidator(control: AbstractControl): ValidationErrors | null{
    const postalcode = control.value;

    if(!postalcode){
      return null;
    }

    let postalCodeRegex = /^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$/;
    let formValid = postalCodeRegex.test(postalcode);

    return !formValid ? { postalCodeWrong: true } : null;
  }

  commentLengthValidator(control: AbstractControl): ValidationErrors | null{
      const comment = control.value;

      if(!comment){
        return null;
      }

      let wordAmount = comment.split(" ");
      let goodLength : boolean = false;

      if(wordAmount.length >= 10){
        goodLength = true;
      }else{
        goodLength = false;
      }

      return !goodLength ? { commentLengthValidator: true } : null;
  }

  nameInCommentValidator(form: AbstractControl): ValidationErrors | null {
    const nom = form.get('nom')?.value;
    const comment = form.get('comment')?.value;

    if(!nom || !comment){
      return null;
    }

    let formValid = comment.includes(nom);

    return formValid?{nameInComment:true}:null;
  }
}

interface Data {
  nom?: string | null;
  roadnumber?: string | null;
  postalcode?: string | null;
  comment?: string | null;
}



