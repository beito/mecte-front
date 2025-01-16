// angular import
import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { TblSearchingComponent } from './tbl-searching/tbl-searching.component';

// third party
import { DataTablesModule } from 'angular-datatables';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tbl-datatable',
  standalone: true,
  imports: [CommonModule, DataTablesModule, TblSearchingComponent],
  templateUrl: './tbl-datatable.component.html',
  styleUrls: ['./tbl-datatable.component.scss']
})
export class TblDatatableComponent implements OnInit {
  // public props
  dtOptions: any = {};

  @Input() tableTitle: string = 'Table Title';
  @Input() apiUrl: string = '';
  @Input() copy: boolean = false;
  @Input() print: boolean = false;
  @Input() excel: boolean = false;
  data: any[] = [];
  constructor(
    private http: HttpClient,
    private renderer: Renderer2
  ) { }

  getData() {
    this.http.get(`${environment.apiUrl}${this.apiUrl}`).subscribe((res: any) => {
      this.dtOptions.columns = Object.keys(res.result[0]).map((key: any) => {
        return {
          title: key,
          data: key
        }
      });
      // this.dtOptions.ajax = (dataTablesParameters: any, callback: any) => {
      //     this.http
      //       .get<any>(
      //         `${environment.apiUrl}${this.apiUrl}`
      //       ).subscribe(resp => {
      //         callback({
      //           data: resp.result
      //         });
      //       });
      //   }
      this.dtOptions.columns.push({
        title: 'Actions',
        data: null,
        render: (data: any, type: any, full: any, meta: any) => {
          return `
            <button id=${data.id} class="btn btn-sm btn-primary">Edit</button>
            <button class="btn btn-sm btn-danger">Delete</button>
          `;
        }
      });
    });
  }

  onClick(data: any) {
  }

  ngOnInit() {
    this.getData();
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback: any) => {
        this.http
          .get<any>(
            `${environment.apiUrl}${this.apiUrl}`
          ).subscribe(resp => {
            callback({
              data: resp.result
            });
          });
      },
      // pageLength: 10,
      pagingType: 'full_numbers',
      dom: 'B<"clear">lfrtip',
      select: true,
      responsive: true,
      buttons: [
        this.copy ? 'copy' : '',
        this.print ? 'print' : '',
        this.excel ? 'excel' : '',
        // {
        //   text: 'Some button',
        //   key: '1',
        //   action: function (e: any, dt: any, node: any, config: any) {
        //     alert('Button activated');
        //   }
        // }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are 
        // deprecated in favor of `off` and `on`
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.onClick(data);
        });
        return row;
      }
    }
  }

  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', (event) => {
      // if (event.target.hasAttribute("view-person-id")) {
        // this.router.navigate(["/person/" + event.target.getAttribute("view-person-id")]);
      // }
    });
  }
}
