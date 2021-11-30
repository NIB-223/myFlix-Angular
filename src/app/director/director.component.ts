import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {
  directorName: string=  ""
  directorBirth: string= ""
  directorDeath: string= ""
  directorBio: string= ""

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<DirectorComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.directorName = data.directorName;
   }

  ngOnInit(): void {
    this.getDirector();
  }

  getDirector(): void {
    this.fetchApiData.getDirector(this.directorName).subscribe((response: any) => {
      this.directorBio = response.Bio;
      this.directorBirth = response.Birth;
      this.directorDeath = response.Death;
      console.log(response)
    })
  }

}
