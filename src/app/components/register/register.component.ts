import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ ReactiveFormsModule, RouterModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  user: User;

  constructor(
    private fb:FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.createRegisterForm();
    this.user = new User();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      name:['' , [Validators.required, Validators.minLength(3)]],
      lastName:['' , [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required ]]
    });
  }

  register() {
    if(this.registerForm.invalid) { return; }
    
    this.user.name = this.registerForm.get('name')?.value;
    this.user.lastName = this.registerForm.get('lastName')?.value;
    this.user.email = this.registerForm.get('email')?.value;
    this.user.password = this.registerForm.get('password')?.value;
    this.user.confirmPassword = this.registerForm.get('confirmPassword')?.value;

    this.auth.registerUser(this.user).subscribe( resp => {
      this.auth.login(this.user).subscribe( resp => {
        this.router.navigateByUrl('/home');
      }, (err) => {
        console.error(err.error.error.message);
      });
    }, (err) => {
      console.error(err.error.error.message);
    });
  }

  get invalidEmail() {
    return this.registerForm.get('email')?.invalid && this.registerForm.get('email')?.touched;
  }

  get invalidPassword() {
    return this.registerForm.get('password')?.invalid && this.registerForm.get('password')?.touched;
  }

  get invalidName() {
    return this.registerForm.get('name')?.invalid && this.registerForm.get('name')?.touched;
  }

  get invalidLastName() {
    return this.registerForm.get('lastName')?.invalid && this.registerForm.get('lastName')?.touched;
  }

  get invalidConfirmPassword() {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    
    return confirmPassword !== password && this.registerForm.get('confirmPassword')?.touched;
  }


}


