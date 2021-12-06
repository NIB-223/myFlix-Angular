import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';


@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.css']
})
export class FavoriteMoviesComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public router:Router,
    public snackBar: MatSnackBar,
  ) { }

  movies: any[] = [];
  favorites: any[] = [];
  actors: any[] = [];
  user: any = {}

  ngOnInit(): void {
    this.getUserFavorites();
    this.getFavoriteMovies();
    this.getMovies();
  }

  removeCommas(actors: any[]): any[] {
    return actors.map((actor: any) => actor.replace(/,/g, '').trim());
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      this.movies.forEach((movie: any) => {
        if (this.user.favorites.includes(movie._id)) {
          this.favorites.push(movie)
        }
      })
    })
  }

  getMovies() {
    this.fetchApiData.getAllMovies().subscribe((res: any[]) => {
         this.movies = res;
        //  this.actors = res.map((movie: any) => movie.actor.replace(/,/g, ''));
         console.log(this.actors);
    });
  }

  getUserFavorites(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.favorites = res.FavoriteMovies;
      console.log(this.favorites)
      return this.favorites;
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

}
