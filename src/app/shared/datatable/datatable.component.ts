import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

  @Output() update_datatable: EventEmitter<any> = new EventEmitter<any>();
  @Output() events_datatable: EventEmitter<any> = new EventEmitter<any>();

  @Input() set in_headers(headers: headers_type[]) {
    this.headers = headers;
  }

  @Input() set in_events(events: events_type[]) {
    this.events = events.filter(value => value.show ? value.show() : true);
  }

  @Input() set in_data(data: data_type) {
    this.data = data;
    if (data.skip) this.filters.skip = data.skip;
    this.calculate_pagination();
    this.loading = false;
  }

  @Input() set in_filters(filters: filters_type) {
    this.filters = filters;
  }

  @Input() set in_configs(configs: configs_type) {
    this.configs = configs;
  }

  public events: events_type[];
  public headers: headers_type[];
  public data: data_type;
  public filters: filters_type;
  public configs!: configs_type;
  public loading!: boolean;
  public error!: string;

  public possible_indexes = new Array(7).fill(-1);
  public divider!: number;

  constructor() {
    this.headers = [];
    this.data = {
      skip: 0,
      count: 0,
      list: []
    };
    this.filters = {
      search_word: "",
      skip: 0,
      limit: 10
    };
    this.events = [];
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.update();
  }

  update() {
    this.loading = false;
    this.update_datatable.emit(this.filters);
  }

  event(name: string, item: any, index: any) {
    this.events_datatable.emit({ name: name, item: item, index: index });
  }

  orderBy(label: string) {
    this.filters.order_asc = this.filters.order_by == label ? !this.filters.order_asc : true;
    this.filters.order_by = label;
    this.update();
  }

  goLast() {
    this.filters.last = true;
    this.update();
  }

  goFirst() {
    this.filters.last = false;
    this.filters.skip = 0;
    this.update();
  }

  go(step: any) {
    this.filters.last = false;
    this.filters.skip += step;
    this.update();
  }

  filter() {
    this.filters.skip = 0;
    this.update();
  }

  cleanFilters() {
    this.filters.search_word = "";
    this.update();
  }

  calculate_pagination() {
    this.divider = Math.floor(this.data.count / (this.filters.limit || 1));

    this.filters.skip = parseInt(this.data.skip + '');

    this.possible_indexes = [
      this.filters.skip - 1,
      this.filters.skip - 2,
      this.filters.skip - 3,
      this.filters.skip,
      this.filters.skip + 1,
      this.filters.skip + 2,
      this.filters.skip + 3,
    ].map(value => {
      if (value < 0) value += 7;

      if (value > this.divider || (this.data.count % (this.filters.limit || 1) == 0 && value >= this.divider)) value -= 7

      return value;
    }).sort((a, b) => a - b);
  }

  getItem(item: any, name: string): string {
    let [tagName, resource] = name.split(".");
    return (resource) ? item[tagName][resource] : item[name];
  }

}

export type headers_type = {
  name: string,
  label: string,
  order_by: string,
  sort?: boolean,
  type?: 'date' | 'disabled'
};

export type configs_type = {
  icon?: string,
  title?: string,
  search?: boolean,
  paginate?: boolean
};

export type filters_type = {
  search_word?: string,
  skip?: number,
  limit?: number,
  last?: boolean,
  order_by?: string,
  order_asc?: boolean
};

export type events_type = {
  icon?: string,
  name?: string,
  disabled?(...a: any): boolean,
  show?(...a: any): boolean
};

export type data_type = {
  skip?: number,
  count: number,
  list: any[]
};

export type datatable_type = {
  headers: headers_type[],
  events: events_type[],
  filters: filters_type,
  configs: configs_type
};
