import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatNativeDateModule } from '@angular/material/core'
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyRepeatComponent } from './formly-repeat/formly-repeat.component'

@NgModule({
  declarations: [
    AppComponent,
    FormlyRepeatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    BrowserAnimationsModule,
    FormlyMatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormlyMatToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    FormlyModule.forRoot({
      extras: { lazyRender: true },
      validationMessages: [
        { name: 'required', message: validateRequired },
        { name: 'minlength', message: validateMinLength },
        { name: 'maxlength', message: validateMaxLength },
        { name: 'min', message: validateMin },
        { name: 'max', message: validateMax },
        // { name: 'ip', message: IpValidatorMessage}
      ],
      validators: [
        { name: 'ip', validation: IpValidator }
      ],
      types: [
        { name: 'repeat', component: FormlyRepeatComponent }
      ]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function validateRequired(err: any, field: FormlyFieldConfig) {
  return `This field is required`
}
export function validateMinLength(err: any, field: FormlyFieldConfig) {
  return `Should have atleast ${field.templateOptions!.minLength} characters`
}
export function validateMaxLength(err: any, field: FormlyFieldConfig) {
  return `Should have less than ${field.templateOptions!.maxLength} characters`
}
export function validateMin(err: any, field: FormlyFieldConfig) {
  return 'This value should be more than ' + field.templateOptions!.min
}
export function validateMax(err: any, field: FormlyFieldConfig) {
  return `This value should be less than ${field.templateOptions!.max}`
}

export function IpValidator(control: AbstractControl, field: FormlyFieldConfig, options: any): ValidationErrors | null {
  return !control.value || /(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : { 'ip': true };
  // return null;
}
export function IpValidatorMessage(err: any, field: FormlyFieldConfig) {
  return `"${field.formControl!.value}" is not a valid IP Address`;
}
