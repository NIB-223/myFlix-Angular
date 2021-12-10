import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  genreDescription: string = ""
  genreName: string = ""

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<GenreComponent>,
    public snackBar: MatSnackBar,
    
    /**
     * injects the genre name and description into modal
     */
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.genreName = data.genreName;
  }

/**
 * displays the genre info when component is mounted
 */
  ngOnInit(): void {
    this.getGenre();
  }

/**
 * gets the genre name and its definition (description)
 */
  getGenre(): void {
    this.fetchApiData.getGenre(this.genreName).subscribe((response: any) => {
     this.genreDescription = response;
     console.log(response)
    })
  }

}
