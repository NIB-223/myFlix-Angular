import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ProfileEditComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {}

  editProfile(): void {
    this.fetchApiData.editUser(this.userData).subscribe((response) => {
      this.dialogRef.close();
      localStorage.setItem('username', response.username)
      console.log(response)
      this.snackBar.open(this.userData.Username, 'Information updated.', {
        duration: 3000
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 3000
      });
    });
  }

}
