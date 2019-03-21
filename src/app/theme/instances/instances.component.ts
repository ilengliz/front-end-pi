import {Component, ViewChild, OnInit} from '@angular/core';
declare var $;



@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss'
]
})
export class InstancesComponent implements OnInit {
  @ViewChild('dataTable') table;
  dataTable: any;
  dtOption: any = {};

  constructor() {
  }

  ngOnInit(): void {
    this.dtOption = {
      'paging':   true,
      'ordering': true,
      'info':     true
  };
  this.dataTable = $(this.table.nativeElement);
  this.dataTable.DataTable(this.dtOption);
  }

}
