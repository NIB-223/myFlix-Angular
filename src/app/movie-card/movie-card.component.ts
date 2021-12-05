import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { map, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  actors: any[] = [];
  user: any

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public router:Router,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  removeCommas(actors: any[]): any[] {
    // this.actors.join(' ');
    return actors.map((actor: any) => actor.replace(/,/g, '').trim());
  }

  getMovies() {
    this.fetchApiData
      .getAllMovies()
      .subscribe((res: any[]) => {
         this.movies = res;
        //  this.actors = res.map((movie: any) => movie.actor.replace(/,/g, ''));
         console.log(this.actors);
    });
  }
  openGenreDialog(genreName: string): void {
    this.dialog.open(GenreComponent, {
      width: '280px',
      data: {
        genreName: genreName
      }
    });
  }
  openDirectorDialog(directorName: string): void {
    this.dialog.open(DirectorComponent, {
      width: '280px',
      data: {
        directorName: directorName
      }
    });
  }
  openSynopsisDialog(synopsis: string, title: string): void {
    this.dialog.open(SynopsisComponent, {
      width: '280px',
      data: {
        title,
         synopsis,
      }
    });
  }

  addFavorite(user: any, _id: string): void {
    this.fetchApiData.addFavMovie(this.user, _id).subscribe((response: any) => {
      this.snackBar.open('Movie added to favorties!', 'OK', {
        duration: 2000,
      });
      console.log(response)
    });
  }
}
