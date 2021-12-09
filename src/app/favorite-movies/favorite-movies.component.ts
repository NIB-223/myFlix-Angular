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
  favoriteMovies: any = [];
  actors: any[] = [];
  user: any = {};

  ngOnInit(): void {
    this.getMovies();
    this.filterFavorites();
    this.getUserFavorites();
  }

  removeCommas(actors: any[]): any[] {
    return actors.map((actor: any) => actor.replace(/,/g, '').trim());
  }

  getMovies() {
    this.fetchApiData.getAllMovies().subscribe((res: any[]) => {
      this.movies = res;
      return this.filterFavorites();
    });
  }

  getUserFavorites(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      return this.filterFavorites();
    });
  }

  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.favorites.includes(movie._id)) {
        this.favoriteMovies.push(movie);
      }
    });
    return this.favoriteMovies;
  }


  removeFavorite(_id: string): void {
    this.fetchApiData.deleteMovie(_id).subscribe((resp: any) => {
      this.snackBar.open('Removed from favorites!', 'OK', {
        duration: 2000,
      });
      console.log(resp);
      window.location.reload();
    })
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
