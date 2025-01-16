import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { Observable } from 'rxjs';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from './services/datepicker-adapter.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ],
})
export class DynamicFormComponent implements OnInit {
  @Input() options!: (OptionsColumnInterface[])[];
  @Input() apiEndpoint!: string;
  @Input() customSubmit!: Function;
  @Input() allowCustomSubmit: boolean = false;
  @Input() id: string | null = null;
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  loading: boolean;

  form!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loading = false;
  }

  ngOnInit() {
    const formGroupControls = this.options.reduce((acc, row) => {
      const rowControls = row.reduce((rowAcc: OptionsColumnInterface, field: OptionsColumnInterface) => {
        if (field.type === 'file') {
          return {
            ...rowAcc,
            [field.name]: new FormControl<File[]>([], this.getFileValidators(field.validations)),
          };
        }

        if (field.type !== 'button') {
          return {
            ...rowAcc,
            [field.name]: [field.initialValue || '', this.getValidators(field.validations)]
          };
        }

        return {} as OptionsColumnInterface;
      }, {} as OptionsColumnInterface);
      return {
        ...acc,
        ...rowControls
      };
    }, {});
    this.form = this.fb.group(formGroupControls);

    this.options.forEach((row) => {
      row.forEach((field: OptionsColumnInterface) => {
        if (field.type === 'dropdown' && field.dependsOn) {
          const control = this.form.get(field.name) as FormControl;
          if (control) {
            this.fetchDependentDropdownData(field as TypeDropdownInterface, control);
          }
        }
      });
    });
  }

  fetchDependentDropdownData(field: TypeDropdownInterface, control: FormControl) {
    const dependsOnControl = this.form.get(field.dependsOn!);
    if (dependsOnControl) {
      dependsOnControl.valueChanges.subscribe(value => {
        if (value && field.dependsOnCallback) {
          control.enable();
          field.dependsOnCallback(value).subscribe(newOptions => {
            field.selectOptions = newOptions;
          });
        } else if (value) {
          control.enable();
          this.http.get(`${field.apiEndpoint}?id=${value}`).subscribe((data: any) => {
            field.selectOptions = data;
          });
        } else {
          control.disable();
        }
      });
    }
  }

  getFileValidators(validations: any): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (validations) {
      Object.keys(validations).forEach((key: string) => {
        const value = validations[key];

        switch (key) {
          case 'required':
            if (value) {
              validators.push(Validators.required);
            }
            break;
          case 'sizeLimit':
            if (typeof value === 'number') {
              validators.push(FileUploadValidators.sizeLimit(value));
            }
            break;
          case 'fileSize':
            if (typeof value === 'number') {
              validators.push(FileUploadValidators.fileSize(value));
            }
            break;
          case 'sizeRange':
            if (typeof value === 'object' && value.minSize && value.maxSize) {
              validators.push(FileUploadValidators.sizeRange(value));
            }
            break;
          case 'filesLimit':
            if (typeof value === 'number') {
              validators.push(FileUploadValidators.filesLimit(value));
            }
            break;
          case 'accept':
            if (Array.isArray(value)) {
              validators.push(FileUploadValidators.accept(value));
            }
            break;
          case 'reject':
            if (Array.isArray(value)) {
              validators.push(FileUploadValidators.reject(value));
            }
            break;
          // Add more cases for other file validators as needed
        }
      });
    }
    return validators;
  }

  private getValidators(validations: any): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (validations) {
      Object.keys(validations).forEach((key: string) => {
        const value = validations[key];

        switch (key) {
          case 'required':
            if (value) {
              validators.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validators.push(Validators.requiredTrue);
            }
            break;
          case 'minlength':
            if (typeof value === 'number') {
              validators.push(Validators.minLength(value));
            }
            break;
          case 'maxlength':
            if (typeof value === 'number') {
              validators.push(Validators.maxLength(value));
            }
            break;
          case 'pattern':
            if (typeof value === 'string' || value instanceof RegExp) {
              validators.push(Validators.pattern(value));
            }
            break;
          case 'email':
            if (value) {
              validators.push(Validators.email);
            }
            break;
          case 'min':
            if (typeof value === 'number') {
              validators.push(Validators.min(value));
            }
            break;
          case 'max':
            if (typeof value === 'number') {
              validators.push(Validators.max(value));
            }
            break;
          // Add more cases for other validators as needed
        }
      });
    }
    return validators;
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      const url = this.id ? `${this.apiEndpoint}/${this.id}` : this.apiEndpoint;
      const method = this.id ? 'put' : 'post';
      if (method === 'put') {
        this.form.value.id = this.id;
        this.http.put(url, this.form.value).subscribe({
          next: (res: any) => {
            this.loading = false;
            this.submit.emit({ success: true, data: res, formValues: this.form.value });
          },
          error: err => {
            this.loading = false;
            this.submit.emit({ success: false, error: err, formValues: this.form.value });
          }
        });
      } else {
        this.http.post(url, this.form.value).subscribe({
          next: (res: any) => {
            this.loading = false;
            this.submit.emit({ success: true, data: res, formValues: this.form.value });
            this.form.reset();
          },
          error: err => {
            this.loading = false;
            this.submit.emit({ success: false, error: err, formValues: this.form.value });
          }
        });
      }
    } else {
    }
  }

  getErrorMessage(fieldName: string, errorKey: string): string {
    let errorMessage = '';

    for (const row of this.options) {
      const field = row.find((option: { name: string; }) => option.name === fieldName);
      if (field?.type != "button") {
        if (field && field.errors && field.errors[errorKey]) {
          errorMessage = field.errors[errorKey] || "Error";
          break; // Exit the loop once the error message is found
        }
      }
    }

    return errorMessage;
  }
}

// --------------------------------------------------------------------------------------------------------------
// --------------------------------------------- INTERFACES / TYPES ---------------------------------------------

export type OptionsColumnInterface = TypeCommonInterface & (
  TypeInputInterface |
  TypeButtonInterface |
  TypeDropdownInterface |
  TypeFileInterface
);

export interface TypeCommonInterface {
  label: string;
  name: string;
  placeholder: string;
  initialValue?: string;
  classes: string;
  show?(...a: any): boolean;
  disabled?(...a: any): boolean;
  change?(...a: any): boolean;
}
export interface TypeInputInterface {
  inputType?: string,
  type: "text" | "calendar";
  errors?: {
    [key: string]: string | undefined;
    required?: string;
    requiredTrue?: string;
    minlength?: string;
    maxlength?: string;
    pattern?: string;
    email?: string;
    min?: string;
    max?: string;
  };
  validations?: {
    [key: string]: any;
    required?: any;
    requiredTrue?: any;
    minlength?: any;
    maxlength?: any;
    pattern?: any;
    email?: any;
    min?: any;
    max?: any;
  };
}

export interface TypeButtonInterface {
  type: "button";
  buttonType: string;
  onClick(...a: any): void
  containerClass?: string;
}
export interface TypeDropdownInterface {
  type: "dropdown";
  selectOptions(...a: any): any;
  dependsOn?: string;
  dependsOnCallback?: (value: any) => Observable<any>;
  apiEndpoint?: string;
  errors?: {
    [key: string]: string | undefined;
    required?: string;
    requiredTrue?: string;
    pattern?: string;
  };
  validations?: {
    [key: string]: any;
    required?: any;
    requiredTrue?: any;
    pattern?: any;
  };
}

export interface TypeFileInterface {
  type: "file";
  allowMultiple?: boolean;
  errors?: {
    [key: string]: string | undefined;
    required?: string;
    sizeLimit?: string;
    fileSize?: string;
    sizeRange?: string;
    filesLimit?: string;
    accept?: string;
    reject?: string;
  };
  validations?: {
    [key: string]: any;
    required?: any;
    sizeLimit?: any;
    fileSize?: any;
    sizeRange?: any;
    filesLimit?: any;
    accept?: any;
    reject?: any;
  };
}

// --------------------------------------------- INTERFACES / TYPES ---------------------------------------------
// --------------------------------------------------------------------------------------------------------------
