import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit { 

  public user = new User();
  confirmPassword?:string;
  myForm!: FormGroup;
  err: any;
  loading : boolean =false;
  constructor(private formBuilder: FormBuilder, private authService : AuthService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
       username : ['', [Validators.required]],
       email : ['', [Validators.required, Validators.email]],
       password : ['', [Validators.required, Validators.minLength(6)]],
       confirmPassword : ['', [Validators.required]]
    } );
  }

  onRegister()
  {
    this.loading=true;
    this.authService.registerUser(this.user).subscribe({ 
      next:(res)=>{
        this. authService.setRegistredUser(this.user);
        this.loading=false;
        this.toastr.success('veillez confirmer votre email', 'Confirmation');
        this.router.navigate(["/verifEmail"]);
      },
       error:(err:any)=>{ 
        if(err.status=400){ 
          this.err= err.error.message;
         }
        }
      })
    }

}
