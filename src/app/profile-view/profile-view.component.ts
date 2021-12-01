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

  ngOnInit(): void {
    this.getAUser();
  }

  getAUser(): void {
    
    this.fetchApiData.getUser(this.user).subscribe((response: any) => {
      this.user = response;
      console.log(this.user);
    })
  }

  openProfileEditDialog(): void {
    this.dialog.open(ProfileEditComponent, {
      width: '280px'
    });
  }

}
