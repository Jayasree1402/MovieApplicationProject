import { Component} from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MoviesService } from '../service/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  
})
export class LogInComponent {
  login: boolean = true;
  hide=true;
 
  constructor(private http:HttpClient,
    private moviesService:MoviesService,private auth:AuthService,private router:Router,private activatedRoute:ActivatedRoute,private snackBar:MatSnackBar){}
  username:string='';
  email:string='';
  password:string='';
  image: File | null = null;
  confirmPassword = '';
  


  togglePage(){
    this.login=!this.login;
  
  }
  registerUser(){ 

   // Check if email and password are provided
   if (!this.username ||!this.email || !this.password) {
    console.error('Email and password are required.');
    return;
  }

  // // Check if an image file is selected
  if (!this.image) {
    console.error('Image file is required.');
    return;
  }
  if (this.passwordsMatch()) {
    console.log('Form submitted successfully!');
    console.log('User:', this.password);
  } else {
    console.log('Form submission failed. Passwords do not match.');
  }

  
  let formData = new FormData();
  formData.append('username', this.username);
  formData.append('email', this.email);
  formData.append('password', this.password);
  formData.append('image', this.image);


  this.auth.postUserDetails(formData).subscribe((data:any) => {
    console.log('success');
    console.log(data);
    alert('registered');
    this.router.navigate(['/']);
  }); 
  
  this.snackBar.open('Successfully registered', '', {
    duration: 3000,
    panelClass: ['mat-toolbar', 'mat-primary']
  });
  }
  passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
    }
  

  onFileChange(event:any) {
    // Get the selected file
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.image = fileList[0];
    }
  }
  Token:string='';
  loginUser(){
    let bodyData={
      "email":this.email,
      "password":this.password
    };
    this.auth.loginUser(bodyData).subscribe({next:(data:any)=>{
      console.log("sucess");
      this.Token=data;
      console.log("token:",this.Token);
      this.auth.Token=this.Token;
      this.moviesService.Token=this.Token
      alert("logined");
      this.snackBar.open('Login Success', '' , {
        duration:3000,
        panelClass: ['mat-primary']
    } );  
      this.router.navigate(['/']); 
       
    },
  error:(error: any)=>{
    alert("Login failed");
    console.error("error msg",error);
  }})
  }
  onSubmit() {
    // Handle login logic here
    // this.bodyData.
    console.log('Form submitted');
  }


  }

