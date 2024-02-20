import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

const RTX5090 = {
  name: 'RTX 5090',
  price: 999,
  inStorage: 1,
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {
  // Method #1
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   insStorage: new FormControl(0),
  // });


// Method #2: with a constructor
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  })

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // this.myForm.reset(RTX5090)
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors: ValidationErrors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength}`;
        case 'min':
          return `El ${field} debe de ser 0 o mayor`;
      }
    }

    return null;

  }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset({
      name: '',
      price: 0,
      inStorage: 0,
    });
  }


}
