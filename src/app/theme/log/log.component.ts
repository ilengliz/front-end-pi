import { Router } from '@angular/router';
import { LogService } from './../../services/log.service';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import set = Reflect.set;

import * as moment from 'moment-timezone';
import { UserService } from 'src/app/services/user.service';

declare var $;

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: [
    './log.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class LogComponent implements OnInit {
  @ViewChild('dataTable') table;
  dataTable: any;
  logs: any [] = [];
  private moment = new moment();
  constructor(
    private logService: LogService,
    private chRef: ChangeDetectorRef,
private userService: UserService,
private router: Router  ) {
    $('#dtBasicExample').DataTable();
    $('.dataTables_length').addClass('bs-select');
  }

  ngOnInit(): void {
    this.logService.getLog().subscribe(
      data => {
        const logTable = data  as Array<any>;
        this.logs = data as any;
      //  console.log(this.logs[148].createdAt.timestamp);
        for (let i = 0; i < this.logs.length; i++) {
this.logs[i].createdAt =   moment
.unix(logTable[i].createdAt.timestamp)
.tz('UTC' + 1)
.format('YYYY-MM-DD T HH:mm:ss');
    }
            this.chRef.detectChanges();
        const table: any = $('#dtBasicExample');
        this.dataTable = table.DataTable();
      },
      error => console.log(error)
    );
  }
  Unix_timestamp(t) {
    const dt = new Date(t * 1000);
    const hr = dt.getHours();
    const m = '0' + dt.getMinutes();
    const s = '0' + dt.getSeconds();
    return hr + ':' + m.substr(-2) + ':' + s.substr(-2);
  }
  profile(email) {
    const profileUrl = `/profile/${email}`;
    this.userService.profilEmail = email ;
    this.router.navigate([profileUrl]);
  }
}
