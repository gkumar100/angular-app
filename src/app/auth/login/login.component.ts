import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../../_services/authentication.service';
import {AlertService} from '../../_services/alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,private authenticationService:AuthenticationService,private alertService:AlertService) {
            console.log('currentUserValue',this.authenticationService.currentUserValue());  
          if (this.authenticationService.currentUserValue() != null) { 
                this.router.navigate(['/admin/dashboard']);
            }
         }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
  }
  get f(){
    return this.loginForm.controls;
  }
  onSubmit(){
    this.submitted = false;
    if(this.loginForm.invalid){
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.username.value,this.f.password.value).pipe(first()).subscribe(
      data=>{
        console.log(data);
        this.router.navigate([this.returnUrl]);
      },
      error=>{
          this.alertService.error(error);
          this.loading = false;
      }
      )

  }
}
