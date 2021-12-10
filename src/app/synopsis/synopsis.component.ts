import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.css']
})
export class SynopsisComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<SynopsisComponent>,
    public snackBar: MatSnackBar,
    /**
     * injects movie data from object into modal
     * @return {string} -movie title and synopsis
     */
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      synopsis: string;
    }
  ) { }

  ngOnInit(): void {
  }

}
