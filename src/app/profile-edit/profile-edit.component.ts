import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCard } from '@angular/material/card';
import { Router } from '@angular/router';

import { DeleteProfileComponent } from '../delete-profile/delete-profile.component'
const username = localStorage.getItem('username');

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  user: any = {}
    /**
   * requried input fields for entering profile info
   */
  @Input() userData = { Username: username, Password: '', Email: '', Birthday: '' };
  /**
    * All constructor items are documented as properties
    * @ignore
  */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ProfileEditComponent>,
    public dialog: MatDialog,
    private router: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {}
/**
 * opens dialog box to {@link DeleteProfileComponent} 
 */
  deleteProfile(): void {
    this.dialog.open(DeleteProfileComponent);
  }


  /**
   * Edits user's birthdate and email
   * @returns {object} changed user info in object
   */
  editProfile(): void {
    this.fetchApiData.editUser(this.userData).subscribe((response: any) => {
      this.dialogRef.close();
      localStorage.setItem('username', response.Username)
      console.log(response)
      this.snackBar.open('Information updated.', 'OK', {
        duration: 3000
      });
      setTimeout(
        () =>
          this.router.navigate(['users']).then(() => {
            window.location.reload();
          }),
        1500
      );
    }, (response: any) => {
      this.snackBar.open(response, 'OK', {
        duration: 3000
      });
    });
  }

}
