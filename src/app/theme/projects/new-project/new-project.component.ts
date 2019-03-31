import { User } from './../../../user';
import { SelectOptionService } from './../../../shared/elements/select-option.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IOption } from 'ng-select';
import { ProjectService } from '../../../services/project.service';



@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss',
  '../../../../assets/icon/icofont/css/icofont.scss']
})
export class NewProjectComponent implements OnInit {
  model: any;

  autocompleteItems: string [] = [''];
  usertable: User[];
  constructor(private userService: UserService, private projectService: ProjectService, private router: Router
    ) {
this.userService.getUsers().subscribe(data => {
    console.log(data[0].email);
 this.usertable = data;
    console.log(this.autocompleteItems);
  },
  error => console.log(error)).add(then => {
      for (let i = 0 ; i < this.usertable.length ; i ++) {
        this.autocompleteItems[i] = this.usertable[i].email ;
      }
    }
    );
   }

  ngOnInit() {
  }

  showInfo(event) {
    console.log(event);
  }
  onAddProject(form: NgForm) {
    const projectName = form.value['projectName'];
    const projectBudget = form.value ['projectBudget'];
    const extraBudget = form.value['extraBudget'];
    const teamleader = form.value['teamleader'][0].value;
this.projectService.addProject(projectName, projectBudget, extraBudget, teamleader);
}

}
