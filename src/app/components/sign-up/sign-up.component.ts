import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionManagerService } from 'src/app/domain/managers/session-manager.service';
import UserEntity from 'src/app/domain/entities/UserEntity';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm!:FormGroup;
  constructor(
    private fb: FormBuilder,
    private sessionM: SessionManagerService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]]
    })
  }

  onSubmit(){
    console.log("valores del form: ",this.signUpForm.value)
    const newUser = new UserEntity({
      email:this.signUpForm.get('email')?.value,
      firstName: this.signUpForm.get('firstName')?.value,
      lastName: this.signUpForm.get('lastName')?.value,
      password: this.signUpForm.get('password')?.value
    })
    this.sessionM.singUp(newUser).subscribe(
      (result)=>{
        if(result.status){
          console.log("Usuario creado con exito, recibira un email con los datos")
          this.router.navigate(['sign-in'])
        }
      }
    )
  }


}
