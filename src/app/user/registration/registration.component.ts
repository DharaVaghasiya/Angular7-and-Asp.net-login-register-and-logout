import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
  ]
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.register().subscribe(
      (res: any) =>{
        if (res.succeeded){
          this.service.formModel.reset();
          this.toastr.success('New User Created!','Registration Successful.');
        }
        else{
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                //Username is already taken.
                console.log('Username already taken.')
                this.toastr.error('Username is already taken.','Registration failed.')
                break;
            
              default:
                //Registration failed.
                this.toastr.error(element.description,'Registration failed.')
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
