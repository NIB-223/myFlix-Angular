import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  genres: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<GenreComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(): void {
    this.fetchApiData.getGenres().subscribe((response: any) => {
      this.genres = response;
      console.log(response)
      return this.genres;
    })
  }

}
