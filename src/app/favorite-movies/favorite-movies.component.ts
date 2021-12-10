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
   /**
    * All constructor items are documented as properties
    * @ignore
    */
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

  /**
   * runs the movie list, filters the movie list for favorites, and then displays only the list of movies that are user's favs
   */
  ngOnInit(): void {
    this.getMovies();
    this.filterFavorites();
    this.getUserFavorites();
  }
/**
 * removes extra commas in between names
 * @param actors -array items are 3 leading actor names
 * @returns {Array} list of actor names without the extra commas
 */
  removeCommas(actors: any[]): any[] {
    return actors.map((actor: any) => actor.replace(/,/g, '').trim());
  }

  /**
   * list of movies
   */
  getMovies() {
    this.fetchApiData.getAllMovies().subscribe((res: any[]) => {
      this.movies = res;
      return this.filterFavorites();
    });
  }

/**
 * gets list of user's favorite movies
 */
  getUserFavorites(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      return this.filterFavorites();
    });
  }

  /**
   * filters the favorites from movie list
   * @returns favoritemoveis property (array)
   */
  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.favorites.includes(movie._id)) {
        this.favoriteMovies.push(movie);
      }
    });
    return this.favoriteMovies;
  }

/**
 * removes a favortie from user's fav movie list
 * @param _id -ID code user's favorite movie
 */
  removeFavorite(_id: string): void {
    this.fetchApiData.deleteMovie(_id).subscribe((resp: any) => {
      this.snackBar.open('Removed from favorites!', 'OK', {
        duration: 2000,
      });
      console.log(resp);
      window.location.reload();
    })
  }

  /**
   * opens modal to {@link GenreComponent}
   * @param genreName - name of genre
   * @returns {string} name of the genre
   */
  openGenreDialog(genreName: string): void {
    this.dialog.open(GenreComponent, {
      width: '280px',
      data: {
        genreName: genreName
      }
    });
  }

  /**
   * opens modal to {@link DirectorComponent} 
   * @param directorName -name of director
   * @returns {string} -name of the director
   */
  openDirectorDialog(directorName: string): void {
    this.dialog.open(DirectorComponent, {
      width: '280px',
      data: {
        directorName: directorName
      }
    });
  }

    /**
   * opens modal to {@link SynopsisComponent}
   * @param synopsis -synopsis of the movie
   * @param title  - movie title
   * @returns {string} returns both the title of the movie and the synopsis of the movie
   */
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
