import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ProfileEditComponent  } from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  user: any = {};


  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
  ) { }
/**
 * When component is mounted, gets user info
 */
  ngOnInit(): void {
    this.getAUser();
  }
/**
 * reformats the date from ISO 8601 to en-Us
 * @param date - the new formatted date
 * @return new date
 */
  formatDate(date:string):string {
    return new Date(date).toLocaleDateString("en-US")
  }

  /**
   * gets user info
   * @returns {object} information in the user object
   */
  getAUser(): void {
    let user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((response: any) => {
      this.user = response;
      console.log(this.user);
    })
  }

  /**
   * opens dialog box to {@link ProfileEditComponent}
   */
  openProfileEditDialog(): void {
    this.dialog.open(ProfileEditComponent, {
      width: '280px'
    });
  }

}
