import { ScheduleService } from '../../services/schedule.service';
import { User } from '../../user';
import { UserService } from '../../services/user.service';
import { Component, OnInit, Directive, ElementRef, HostListener, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { scheduleMicroTask } from '@angular/core/src/util';
declare var $: any;



@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss/../icofont.scss']
})
export class NewScheduleComponent implements OnInit {
  model: any;
  isNotUnique = false;
  autocompleteItems: string [] = [''];
  usertable: User[];
  constructor(private userService: UserService,
      private router: Router,
      private scheduleService: ScheduleService
    ) {}
   public ngOnInit() {
    $(function() {
      let isMouseDown = false;
      $('#our_table td').mousedown(function(e) {
              isMouseDown = true;
              // $(this).closest("tr").addClass("present");
              // alert(!$('.present').contains(e));
              $(this).toggleClass('highlighted');
              return false; // prevent text selection
          })
          .mouseover(function() {
              if (isMouseDown) {
                  $(this).toggleClass('highlighted');
              }
          });

      $(document)
          .mouseup(function() {
              isMouseDown = false;
          });
  });
   }
  showInfo(event) {
    console.log(event);
  }
  onAddSchudule(form: NgForm) {
    const queryArr = [];

    let h ;
 $('#our_table tr').each(function(i) {
    $.each(this.cells, function(j: any) {
      if (j < 10) {
        h =  j.toString();
        h = '0' + h;

             } else {
               h =  j.toString();
             }
if ($(this).hasClass('highlighted')) {

  const time = {
        '0' : h ,
        '1' : 'true',
        '2': i.toString()
      };

     queryArr.push(time);
      } else {
  const time = {
    '0' : h ,
    '1' : 'false',
    '2': i.toString()
  };

 queryArr.push(time);
  }


    });

 });
// for ( let k = 0; k < queryArr.length; k++) {
  // alert(queryArr[k].schedule.day + '    ' + queryArr[k].schedule.time.start)  ;
  // }
  const projectName = queryArr;
  const day = 'Mon';
  const name = form.value['scheduleName'];
  const description = form.value['description'];
if (name !== '') {
  this.scheduleService.addSchedule(projectName , day, name, description).subscribe(data => {
    console.log(data);
    this.router.navigateByUrl('/schedule');

  },
  error => { console.log(error);
    this.isNotUnique = true;
  }
  );
} else {
  this.isNotUnique = true;

}
}}
@Directive({
  selector: '[appRemoveAlert]'
})export class RemoveAlertDirective {
  alert_parent: any;
  constructor(private elements: ElementRef) {}

  @HostListener('click', ['$event'])
  onToggle($event: any) {
    $event.preventDefault();
    this.alert_parent = (this.elements).nativeElement.parentElement;
    this.alert_parent.remove();
  }
}
