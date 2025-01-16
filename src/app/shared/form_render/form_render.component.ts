import { Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef } from '@angular/core';
import { FormControlDirective } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxFileDropEntry } from 'ngx-file-drop';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import emailMask from 'text-mask-addons/dist/emailMask';
import flatpickr from 'flatpickr';
import { PipesService } from '../pipes/pipes.service';
import { Spanish } from 'flatpickr/dist/l10n/es';

@Component({
  selector: 'app-form_render',
  templateUrl: './form_render.component.html',
  styleUrls: ['./form_render.component.scss'],
})
export class FormRenderComponent implements OnInit, AfterViewInit {
  @ViewChild('form_ref', { static: false }) form_ref!: FormControlDirective;
  @ViewChild('calendarInput', { static: false }) calendarInput!: ElementRef;
  @ViewChild('monthInput', { static: false }) monthInput!: ElementRef;

  @Input('config') config!: form_type;

  @Input() data: any;

  // REGEX
  public name_regex = /^[\p{L}\s']*$/u;
  public number_regex = /^[0-9]+$/;
  public email_regex =
    /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/;
  public submitted: boolean;
  // MASK
  public hn_identification_mask = [
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    '-',
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    '-',
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
  ];
  public hn_phone_mask = [
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    '-',
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
  ];
  public number_mask = createNumberMask({
    allowNegative: false,
    allowDecimal: false,
    prefix: '',
    includeThousandsSeparator: false,
    allowLeadingZeroes: true,
  });
  public email_mask = emailMask;
  public integer_mask = createNumberMask({
    allowNegative: false,
    allowDecimal: false,
    integerLimit: 25,
    prefix: '',
    includeThousandsSeparator: true,
  });
  public decimal_mask = createNumberMask({
    allowNegative: false,
    allowDecimal: true,
    integerLimit: 25,
    decimalLimit: 25,
    prefix: '',
    includeThousandsSeparator: true,
  });
  public money_mask = createNumberMask({
    allowNegative: false,
    allowDecimal: true,
    integerLimit: 20,
    decimalLimit: 2,
    prefix: 'L ',
    includeThousandsSeparator: true,
  });

  constructor(
    private modalService: NgbModal,
    private pipesService: PipesService
  ) {
    this.submitted = false;
  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    if (this.calendarInput) {
      flatpickr(this.calendarInput.nativeElement, {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        altInput: true,
        altFormat: 'F j, Y H:i',
        locale: Spanish,
        onChange: (selectedDates, dateStr) => {
          const colName = this.calendarInput.nativeElement.getAttribute('data-col-name');
          if (colName) {
            this.data[colName] = dateStr;
          }
        },
      });
    }
  
    // Configuración para inputs de tipo "calendar-month"
    if (this.monthInput) {
      flatpickr(this.monthInput.nativeElement, {
        dateFormat: 'Y-m',
        altInput: true,
        altFormat: 'F Y',
        locale: Spanish,
        onChange: (selectedDates, dateStr) => {
          const colName = this.monthInput.nativeElement.getAttribute('data-col-name');
          if (colName) {
            this.data[colName] = dateStr;
          }
        },
      });
    }
  }
  

  public readonly input_name_stuff = {
    paste: (event: any, callback: any) => {
      let clipboardData = event.clipboardData || window['clipboardData'];
      let pastedText = clipboardData.getData('text');
      if (callback) callback(pastedText);
      if (this.name_regex.test(pastedText)) return true;
      event.preventDefault();
      return false;
    },
    keypress: (event: any, callback: any) => {
      let inp = String.fromCharCode(event.keyCode);
      if (callback) callback(inp);
      if (this.name_regex.test(inp)) return true;
      event.preventDefault();
      return false;
    },
  };

  valid_email(email: any) {
    return this.email_regex.test(email);
  }

  valid() {
    let valid = true;
    this.config.rows.forEach((row) => {
      row.cols.forEach((col) => {
        if (
          col.type != 'divider' &&
          col.type != 'toogle-carousel' &&
          col.type != 'buttons' &&
          col.type != 'tags' &&
          col.validators
        ) {
          if (
            col.validators.custom &&
            !col.validators.custom.value(this.data[col.name])
          ) {
            valid = false;
          }

          if (col.type == 'email') {
            if (
              this.data[col.name] &&
              col?.validators?.required?.value() == true
            ) {
              if (!this.email_regex.test(this.data[col.name])) {
                valid = false;
              }
            }
            if (
              this.data[col.name] &&
              !this.email_regex.test(this.data[col.name])
            ) {
              valid = false;
            } else if (
              !this.data[col.name] &&
              col?.validators?.required?.value() == true
            ) {
              valid = false;
            }
          }
        }
      });
    });
    return !this.form_ref.invalid && valid;
  }

  submit(callback: any) {
    this.submitted = true;
    this.form_ref['submitted'] = true;
    callback();
  }

  submit_event(callback = (callback_data?: any) => { }) {
    this.config.submit(callback);
  }

  unsubmit() {
    this.submitted = false;
    this.form_ref['submitted'] = false;
  }

  checkbox_check(list: any[], id: string): any[] {
    if (!Array.isArray(list)) {
      list = new Array();
    }
    if (list.find((value) => value == id)) {
      list = list.filter((value) => value != id);
    } else {
      list.push(id);
    }
    return list;
  }

  checkbox_is_checked(list: any[], id: string): boolean {
    if (!Array.isArray(list)) {
      list = new Array();
    }
    return !!list.find((value) => value == id);
  }

  dropped(files: NgxFileDropEntry[]) {
    return files;
  }

  fileOver(event: any) { }

  fileLeave(event: any) { }

  get_upload_url(path: string, name: string) {
    return '';
  }

  delete_upload(list: any[], index: number): any[] {
    if (!Array.isArray(list)) {
      list = new Array();
    }
    if (list[index]) {
      list = list.filter((v, i) => i != index);
    }
    return list;
  }

  toogle_dropdown(dropdown: any, input: any) {
    dropdown.classList.toggle('show');
    input.focus();
  }

  clean_fields() {
    this.config.rows.forEach((row) => {
      row.cols.forEach((col) => {
        if (
          col.type != 'divider' &&
          col.type != 'toogle-carousel' &&
          col.type != 'buttons' &&
          col.type != 'tags'
        ) {
          this.data[col.name] = '';
        }
      });
    });
    this.unsubmit();
  }

  upload_amount(list: any, amount: any) {
    return list && amount ? list.slice(0, amount) : list;
  }

  close_modal(callback?: any) {
    if (callback) callback();
    this.modalService.dismissAll(true);
  }

  test_my(input_ref: any, event: any) {
    input_ref.value = this.pipesService.monthYear(event);
    return true;
  }

  parse_month_year(str: string): string {
    let _str = this.pipesService.monthYear(str);
    return _str;
  }
}

type common_type = {
  name: string;
  label?: string;
  small?: string;
  placeholder?: Function;
  description?: string;
  col_class: string;
  class?: string;

  tooltip?: {
    class: string;
    icon: string;
    text: string;
    show?(): boolean;
  };
  toogle?: string;
};

export type form_type = {
  name?: string;
  description?: string;
  show?(): Boolean;
  disabled?(): Boolean;
  autocomplete?: Function;
  pretty_view?: Function;
  submit: Function;
  rows: row_type[];
};

export type row_type = {
  class?: string;
  cols: (
    | divider_type
    | toogle_carousel_type
    | buttons_type
    | input_password_type
    | input_text_type
    | input_name_type
    | input_select_type
    | input_select_search_type
    | input_phone_type
    | input_identification_type
    | input_calendar_type
    | input_textarea_type
    | input_email_type
    | input_number_type
    | input_radio_type
    | input_checkbox_type
    | input_upload_type
    | tags_type
  )[];
};

export type filter_type = {
  name: string;
  list: Function;
  show?(): Boolean;
  disabled?(): Boolean;
  value: string;
  pretty_view?: boolean;
  no_border?: boolean;
  text: string;
  tooltip?: string;
  change?: Function;
};

export type tags_type = {
  label?: string;
  small?: string;
  type: 'tags';
  list: any[];
  col_class: string;
  class: string;
  toogle?: string;
};

export type toogle_carousel_type = {
  col_class: string;
  class?: string;
  name: string;
  type: 'toogle-carousel';
  label: string;
};

export type divider_type = {
  col_class: string;
  class?: string;
  bar?: boolean;
  type: 'divider';
  label: string;
  toogle?: string;
  show?(): Boolean;
};

export type buttons_type = {
  col_class: string;
  type: 'buttons';
  toogle?: string;
  buttons: {
    class?: string;
    label: string;
    type: 'submit' | 'button' | 'modal_close';
    link?: string;
    icon?: {
      name: string;
      class?: string;
      position: 'left' | 'right';
    };
    show?(): Boolean;
    disabled?(): Boolean;
    
    click?: Function;
  }[];
};

export type input_type = common_type & {
  type: string;

  validators?: {
    custom?: {
      error?: string;
      value: Function;
    };
    required?: {
      error?: string;
      value: Function;
    };
    maxlength?: {
      error?: string;
      value: Function;
    };
    minlength?: {
      error?: string;
      value: Function;
    };
    pattern?: {
      error?: string;
      value: Function;
    };
  };

  catalog?: {
    list: Function;
    value: string;
    text: string;
  };

  mask?: Function;
  show?(): Boolean;
  disabled?(): Boolean;
  change?: Function;
  paste?: Function;
  keypress?: Function;
  input?: Function;
};

export type input_text_type = common_type & {
  type: 'text';

  validators?: {
    custom?: {
      error?: string;
      value: Function;
    };
    required?: {
      error?: string;
      value: Function;
    };
    maxlength?: {
      error?: string;
      value: Function;
    };
    minlength?: {
      error?: string;
      value: Function;
    };
    pattern?: {
      error?: string;
      value: Function;
    };
  };

  filter?: filter_type;

  show?(): Boolean;
  disabled?(): Boolean;
  change?: Function;
  paste?: Function;
  keypress?: Function;
  input?: Function;
};

export type input_password_type = common_type & {
  type: 'password';

  validators?: {
    custom?: {
      error?: string;
      value: Function;
    };
    required?: {
      error?: string;
      value: Function;
    };
    maxlength?: {
      error?: string;
      value: Function;
    };
    minlength?: {
      error?: string;
      value: Function;
    };
    pattern?: {
      error?: string;
      value: Function;
    };
  };

  show?(): Boolean;
  disabled?(): Boolean;
  change?: Function;
  paste?: Function;
  keypress?: Function;
  input?: Function;
};

export type input_name_type = common_type & {
  type: 'name';

  validators?: {
    custom?: {
      error?: string;
      value: Function;
    };
    required?: {
      error?: string;
      value: Function;
    };
    maxlength?: {
      error?: string;
      value: Function;
    };
    minlength?: {
      error?: string;
      value: Function;
    };
  };

  show?(): Boolean;
  disabled?(): Boolean;
  change?: Function;
  paste?: Function;
  keypress?: Function;
  input?: Function;
};

export type input_select_type = common_type & {
  type: 'select';

  validators?: {
    custom?: {
      error?: string;
      value: Function;
    };
    required?: {
      error?: string;
      value: Function;
    };
  };

  catalog: {
    list: Function;
    value: string;
    text: string;
  };

  show?(): Boolean;
  disabled?(): Boolean;
  change?: Function;
};

export type input_select_search_type = common_type & {
  type: 'select-search';

  validators?: {
    custom?: {
      error?: string;
      value: Function;
    };
    required?: {
      error?: string;
      value: Function;
    };
  };

  catalog: {
    list: Function;
    value: string;
    text: string;
  };
  loading?: Function;

  show?(): Boolean;
  disabled?(): Boolean;
  change: Function;
  input?: Function;
  select: Function;
  paste?: Function;
  keypress?: Function;
};

export type input_phone_type = common_type & {
  type: 'phone';
  hn: Function;

  validators?: {
    custom?: {
      error?: string;
      value: Function;
    };
    required?: {
      error?: string;
      value: Function;
    };
    maxlength?: {
      error?: string;
      value: Function;
    };
  };

  show?(): Boolean;
  disabled?(): Boolean;
  change?: Function;
  paste?: Function;
  keypress?: Function;
  input?: Function;
};

export type input_identification_type = common_type & {
  type: 'identification';
  hn: Function;

  validators?: {
    custom?: {
      error?: string;
      value: Function;
    };
    required?: {
      error?: string;
      value: Function;
    };
    maxlength?: {
      error?: string;
      value: Function;
    };
  };

  show?(): Boolean;
  disabled?(): Boolean;
  change?: Function;
  paste?: Function;
  keypress?: Function;
  input?: Function;
};

export type input_calendar_type = common_type & {
  type: 'calendar' | 'calendar-month';

  validators?: {
    custom?: {
      error?: string;
      value: Function;
    };
    min?: {
      error?: string;
      value: Function;
    };
    max?: {
      error?: string;
      value: Function;
    };
    required?: {
      error?: string;
      value: Function;
    };
  };

  show?(): Boolean;
  disabled?(): Boolean;
  change?: Function;
  input?: Function;
};

export type input_textarea_type = common_type & {
  type: 'textarea';

  rows: number;

  validators?: {
    custom?: {
      error?: string;
      value: Function;
    };
    required?: {
      error?: string;
      value: Function;
    };
    maxlength?: {
      error?: string;
      value: Function;
    };
    minlength?: {
      error?: string;
      value: Function;
    };
    pattern?: {
      error?: string;
      value: Function;
    };
  };

  show?(): Boolean;
  disabled?(): Boolean;
  change?: Function;
  paste?: Function;
  keypress?: Function;
  input?: Function;
};

export type input_email_type = common_type & {
  type: 'email';

  validators?: {
    custom?: {
      error?: string;
      value: Function;
    };
    required?: {
      error?: string;
      value: Function;
    };
  };

  show?(): Boolean;
  disabled?(): Boolean;
  change?: Function;
  paste?: Function;
  keypress?: Function;
  input?: Function;
};

export type input_number_type = common_type & {
  type: 'number' | 'integer' | 'decimal' | 'money';

  validators?: {
    custom?: {
      error?: string;
      value: Function;
    };
    required?: {
      error?: string;
      value: Function;
    };
    min?: {
      error?: string;
      value: Function;
    };
    max?: {
      error?: string;
      value: Function;
    };
    maxlength?: {
      error?: string;
      value: Function;
    };
    minlength?: {
      error?: string;
      value: Function;
    };
  };

  filter?: filter_type;

  show?(): Boolean;
  disabled?(): Boolean;
  change?: Function;
  paste?: Function;
  keypress?: Function;
  input?: Function;
};

export type input_radio_type = common_type & {
  type: 'radio';

  validators?: {
    custom?: {
      error?: string;
      value: Function;
    };
    required?: {
      error?: string;
      value: Function;
    };
  };

  catalog: {
    list: Function;
    value: string;
    text: string;
  };

  show?(): Boolean;
  disabled?(): Boolean;
  change?: Function;
};

export type input_checkbox_type = common_type & {
  type: 'checkbox';

  validators?: {
    custom?: {
      error?: string;
      value: Function;
    };
    required?: {
      error?: string;
      value: Function;
    };
  };

  catalog: {
    list: Function;
    value: string;
    text: string;
  };

  show?(): Boolean;
  disabled?(): Boolean;
  change?: Function;
};

export type input_upload_type = common_type & {
  type: 'upload';
  path: string;

  amount?: number;

  validators?: {
    custom?: {
      error?: string;
      value: Function;
    };
    required?: {
      error?: string;
      value: Function;
    };
  };

  accept?: string;
  show?(): Boolean;
  disabled?(): Boolean;
  change?: Function;
};
