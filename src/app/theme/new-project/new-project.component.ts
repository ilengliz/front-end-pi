import { User } from '../../user';
import { UserService } from '../../services/user.service';
import { Component, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';



@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss/../icofont.scss']
})
export class NewProjectComponent implements OnInit {
  model: any;
  teamleader = '';
  autocompleteItems: string [] = [''];
  usertable: User[];
  users: User [] = [];
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
  this.userService.getUsers().subscribe(data => {
    console.log(data);
    this.users = data;
  }, err => console.log (err));


  }

  showInfo(event) {
    console.log(event);
  }
  onAddProject(form: NgForm) {
    const projectName = form.value['projectName'];
    const projectBudget = form.value ['projectBudget'];
    const extraBudget = form.value['extraBudget'];
    const teamleader = form.value['teamleader'];
this.projectService.addProject(projectName, projectBudget, extraBudget, teamleader).subscribe(data => {
  this.router.navigateByUrl('/projects');
},
error =>
console.log(error)
);
}

}
