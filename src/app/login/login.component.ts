import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUser } from '../model/user.model';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage:string ='';
  userFormGroup!:FormGroup;
  constructor(private fb:FormBuilder,private authenticateService:AuthentificationService
    ,private router:Router) {
    

  }


  ngOnInit(): void {
    this.userFormGroup=this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control(""),
    })
  }
  handleSubmit(){
    let userName = this.userFormGroup.value.username;
    let password = this.userFormGroup.value.password;

    this.authenticateService.login(userName,password).subscribe({
      next: (appUser:AppUser)=>{
        this.authenticateService.authenticateUser(appUser).subscribe({
          next:(data:boolean)=> {
              this.router.navigateByUrl("/admin")
          }
        })

      },
      error: (error)=>{
        this.errorMessage=error;
      }
    })

  }


}
