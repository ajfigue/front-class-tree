import { Component, OnInit } from '@angular/core';
import { every } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../servicio/login.service';
import { SweetAlertOptions } from 'sweetalert2';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    passwords: ['', Validators.required]
  })


  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) { }


  ngOnInit(): void {

  }

  get email() {
    return this.loginForm.controls.email;
  }

  get passwords() {
    return this.loginForm.controls.passwords;
  }

  login() {
    const data = {
      email: this.email.value,
      password: this.passwords.value,
    }
    if (this.loginForm.valid) {
      this.loginService.login(data).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          Swal.fire({ icon: 'error', title: 'Oops...', text: errorData.error.message })
          return;
        },
        complete: () => {
          console.info("Login Completo");
          this.router.navigateByUrl('/logAdmin');
          this.loginForm.reset();
        }
      });
    }
    else {
      this.loginForm.markAllAsTouched();
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'empty fields' })
    }
  }



  userPassIncorrectActive = false;
  user = "";
  password = "";
  newuser = "";
  newpassword = "";
  newpasswordConfirm = "";

  inputValue = "";
  newOn = 1;
  CuadroInicioSesion = false;
  cuadroRegistrarse = false;
  Reg_Nombre_Usuario = false;
  Reg_nueva_pass = false;
  Reg_Cnueva_pass = false;
  Confirmar_samePass = false;


  usuarioCheck(event: Event) {
    this.user = (<HTMLInputElement>event.target).value;
  }

  passwordCheck(event: Event) {
    this.password = (<HTMLInputElement>event.target).value;
  }

  IniciarSesion() {
    if (this.user !== "root" || this.password !== "1234") {
      this.userPassIncorrectActive = true;
    }
    else {
      this.userPassIncorrectActive = false;
    }

  }

  registrarOn() {
    this.CuadroInicioSesion = true;
    this.cuadroRegistrarse = true;
  }

  registrarOff() {
    this.CuadroInicioSesion = false;
    this.cuadroRegistrarse = false;
  }

  newUsername(event: Event) {
    this.newuser = (<HTMLInputElement>event.target).value;
  }

  newPassword(event: Event) {
    this.newpassword = (<HTMLInputElement>event.target).value;
  }

  newPasswordConfirm(event: Event) {
    this.newpasswordConfirm = (<HTMLInputElement>event.target).value;
  }

  registrarCuenta() {
    // var newUsername = document.getElementById('nuevo_usuario').value,
    //   newPassword = document.getElementById('nueva_contraseña').value,
    //   newPasswordConfirm = document.getElementById('repetir_nueva_contraseña').value,
    // noUser = document.getElementById('Reg_Nombre_Usuario'),
    //   noPassword = document.getElementById('Reg_nueva_contraseña'),
    //   noConfirmPassword = document.getElementById('Reg_Cnueva_contraseña'),
    //   samePasswords = document.getElementById('Confirmar_contraseña'),
    //   newOn = 0;

    if (this.newuser == '' || this.newuser == null) {
      this.Reg_Nombre_Usuario = true;

    }
    else {
      this.Reg_Nombre_Usuario = false;
    }

    if (this.newpassword == '' || this.newpassword == null) {
      this.Reg_nueva_pass = true;
    }
    else {
      this.Reg_nueva_pass = false;
    }

    if (this.newpasswordConfirm == '' || this.newpasswordConfirm == null) {
      this.Reg_Cnueva_pass = true;
      this.newOn == 0;
    }
    else {
      this.Reg_Cnueva_pass = false;
    }

    if (this.newOn == 1) {
      if (this.newpassword !== this.newpasswordConfirm) {
        this.Confirmar_samePass = true;
      }
      else {
        this.Confirmar_samePass = false;
      }
    }

  }

}
