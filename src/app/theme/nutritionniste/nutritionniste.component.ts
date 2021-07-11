import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';


@Component({
  selector: 'app-nutritionniste',
  templateUrl: './nutritionniste.component.html',
  styleUrls: ['./nutritionniste.component.scss']
})
export class NutritionnisteComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
  
  openSuccessCancelSwal(i) {
    swal({
      title:
        'Are you sure you want to delete  ' + ' VM ?',
      text: 'This action cannot be undone !',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger mr-sm'
    }).then(result => {
      if (result.value) {
        swal('Deleted!', 'Your VM instance has been deleted.', 'success');
      } else if (result.dismiss) {
        swal('Cancelled', 'Your  VM instance is safe :)', 'error');
      }
    });
  }


 nutritionnistes = [{
    'id': '1', 'nom':
      'Ibtissem', 'prenom': 'Lengliz', 'email': 'ilengliz@vermeg.com', 'salleDeSport': 'california gym', 'conseils': 'conseil1', 'disponibilite': 'from 8 to 10','num':'99339231'
  },
  {
    'id': '2', 'nom':
      'Nour', 'prenom': 'ahlem', 'email': 'ilengliz@vermeg.com', 'salleDeSport': 'MK', 'conseils': 'conseil1', 'disponibilite': 'from 8 to 10','num':'123456'
  },
  {
    'id': '3', 'nom':
      'Nour', 'prenom': 'ahlem', 'email': 'ilengliz@vermeg.com', 'salleDeSport': 'Snap gym', 'conseils': 'conseil1', 'disponibilite': 'from 8 to 10','num':'99339231'
  }];

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
}
