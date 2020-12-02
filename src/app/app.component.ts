import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core'


@Component({
  selector: 'app-root',
  template: `
  <form [formGroup]="form" (ngSubmit)="onSubmit(model)">
    <formly-form [form]="form" [fields]="fields" [model]="model" [options]="options"></formly-form>
    <button type="button" mat-raised-button color="warn" (click)="options.resetModel()">Reset</button>
    <button type="submit" mat-raised-button color="warn" class="btn">submit</button>
  </form>
  `,
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      label: 'name',
      placeholder: 'Enter Name',
      minLength: 10
    }
  },
  {
    key: 'email',
    type: 'input',
    hideExpression: '!model.name',
    templateOptions: {
      type: 'email',
      label: 'email',
      placeholder: 'Enter Email',
      required: true
    }
  },
  {
    key: 'amount',
    type: 'input',
    templateOptions: {
      type: 'number',
      label: 'Amount',
      placeholder: 'Enter amount',
    }
  },
  {
    key: 'data_of_birth',
    type: 'datepicker',
    templateOptions: {
      label: 'datepicker',
      placeholder: 'Placeholder',
      description: 'Description',
      required: true
    }
  },
  {
    key: 'terms',
    type: 'checkbox',
    templateOptions: {
      label: 'accept terms',
      description: 'Please accept our terms',
      required: true
    }
  },
  {
    key: 'terms_1',
    type: 'toggle',
    templateOptions: {
      label: 'accept terms',
      description: 'Please accept our terms',
      required: true
    }
  },
  {
    key: 'description',
    type: 'textarea',
    templateOptions: {
      label: 'description',
      placeholder: 'Enter description'
    }
  },
  {
    key: 'gender',
    type: 'radio',
    templateOptions: {
      label: 'gender',
      placeholder: 'Placeholder',
      description: 'Fill in your gender',
      options: [
        { value: 1, label: 'Male' },
        { value: 2, label: 'Female' },
        { value: 3, label: 'I don\'t want to share that' }
      ]
    }
  },
  {
    key: 'product_type',
    type: 'select',
    templateOptions: {
      label: 'product type',
      placeholder: 'Product Type',
      description: 'Select the product type',
      required: true,
      options: Object.keys(ProductType).map((index) => {
        if (new RegExp(/[0-9]/g).test(index)) {
          var indexNumber = Number(index);
          if (ProductType[indexNumber]) {
            return {
              value: index,
              label: ProductType[indexNumber]
            }
          }
        }

        return null;
      }).filter(p => p !== null)
    }
  },
  {
    key: 'ip',
    type: 'input',
    templateOptions: {
      label: 'IP Address (using custom validation declared in ngModule)',
      required: true,
    },
    validators: {
      validation: ['ip'],
    },
   },
   {
    key: 'investments',
    type: 'repeat',
    templateOptions: {
      addText: 'Add another investment',
    },
    fieldArray: {
      fieldGroup: [
        {
          type: 'input',
          key: 'investmentName',
          templateOptions: {
            label: 'Name of Investment:',
            required: true,
          },
        },
        {
          type: 'datepicker',
          key: 'investmentDate',
          templateOptions: {
            label: 'Date of Investment:',
          },
        },
        {
          key: 'amount',
          type: 'input',
          templateOptions: {
            type: 'number',
            label: 'Amount',
            placeholder: 'Enter amount',
            min: 1,
            max: 15
          }
        },
      ],
    },
  }
  ];
  that = this;
  options: FormlyFormOptions = {};
	model = { 
    email: "",
    terms_1: false,
    terms: false,
    date_of_birth: '',
    amount: 100,
    name: "",
    description: "",
    gender: 3 
  }

  onSubmit(param: any) {
    console.log(param)
    console.log(this.model)
  }
}

enum ProductType {
  PRODUCT_A,
  PRODUCT_B,
  PRODUCT_C,
  PRODUCT_D
}
