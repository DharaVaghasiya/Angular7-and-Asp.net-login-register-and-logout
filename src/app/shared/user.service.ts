import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'http://localhost:62453/api'

  formModel = this.fb.group({
    UserName : ['', Validators.required],
    Email : ['', Validators.email],
    FullName : [''],
    Passwords : this.fb.group({
      Password : ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword : ['', Validators.required]
    }, {validators: this.comparePassword })
    
  });

  comparePassword(fb: FormGroup){
    let ConfirmPasswordCtrl = fb.get('ConfirmPassword');
    //password mismatch
    //ConfirmPasswordCtrl.errors={ passwordMismatch : true }
    if(ConfirmPasswordCtrl.errors == null || 'passwordMismatch' in ConfirmPasswordCtrl.errors){
      if(fb.get('Password').value != ConfirmPasswordCtrl.value )
      ConfirmPasswordCtrl.setErrors({ passwordMismatch : true});
      else
      ConfirmPasswordCtrl.setErrors(null);
    }
  }

  register(){
 var body = {
   UserName: this.formModel.value.UserName,
   Email: this.formModel.value.Email,
   FullName: this.formModel.value.FullName,
   Password: this.formModel.value.Passwords.Password,
 };
  return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }
}
