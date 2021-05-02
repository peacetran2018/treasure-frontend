import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user/user.service'
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { SecurityHelperService } from '../../shared/common/security-helper.service'

@Component({
  selector: 'app-treasure-login-signup',
  templateUrl: './treasure-login-signup.component.html',
  styleUrls: ['./treasure-login-signup.component.css']
})
export class TreasureLoginSignupComponent implements OnInit {
  signupForm: FormGroup;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = "";

  constructor(private formBuilder: FormBuilder, private userService: UserService, private securityHelper: SecurityHelperService,
    private router: Router, private route: ActivatedRoute, ) {
    // redirect to note page if already logged in
    if (this.userService.currentUserValue) {
      this.router.navigate(['/treasure/note']);
    }
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/treasure/note';
  }

  get fSignUp() { return this.signupForm.controls; }
  get fLogin() { return this.loginForm.controls; }

  Toggle(mode: string) {
    switch (mode) {
      case "login":
        document.getElementById("login").classList.add("show");
        document.getElementById("login").classList.remove("hidden");
        document.getElementById("signup").classList.remove("show");
        document.getElementById("signup").classList.add("hidden");

        document.getElementById("lisignup").classList.remove("active");
        document.getElementById("lilogin").classList.add("active");
        break;
      case "signup":
        document.getElementById("login").classList.add("hidden");
        document.getElementById("login").classList.remove("show");
        document.getElementById("signup").classList.remove("hidden");
        document.getElementById("signup").classList.add("show");

        document.getElementById("lisignup").classList.add("active");
        document.getElementById("lilogin").classList.remove("active");
        break;
    }
  }

  async onSignUp() {
    this.signupForm.value.password = await this.securityHelper.encryptUsingPBKDF2(this.signupForm.value.username, this.signupForm.value.password);
    this.submitted = true;
    //when form is valid then stop here
    if (this.signupForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.signup(this.signupForm.value).subscribe(data => {
      alert("Signed Up Successfully!!!");
    }, error => {
      switch (error.status) {
        case 409:
          alert("Username is existing. Please change to another username!!!");
          break;
        default:
          alert("Bad Request");
          break;
      }
      this.loading = false;
    })
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.userService.login(this.loginForm.value.username).subscribe(async x => {
      let decryptPassword = await this.securityHelper.decryptUsingFBKDF2(x.password, x.username);
      if (decryptPassword === this.loginForm.value.password) {
        this.router.navigate(['/treasure/note']);
      }
      else{
        alert("Username or Password is not correct. Please try again!!!")
      }
    });
  }
}
