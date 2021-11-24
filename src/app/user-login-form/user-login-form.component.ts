import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }
  // This is the function responsible for sending the form inputs to the backend
loginUser(): void {
  this.fetchApiData.userLogin(this.userData).subscribe((response) => {
  localStorage.setItem('username', response.user.username);
  localStorage.setItem('token', response.token);
   this.dialogRef.close(); // This will close the modal on success!
   console.log(response);
   this.snackBar.open('You are now logged in.', 'OK', {
      duration: 2000
   });
   this.router.navigate(['movies']);
  }, (response) => {
    console.log(response);
    this.snackBar.open(response, 'OK', {
      duration: 2000
    });
  });
}
}
