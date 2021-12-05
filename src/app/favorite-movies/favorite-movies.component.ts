import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.css']
})
export class FavoriteMoviesComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
  ) { }

  favorites: any = []
  

  ngOnInit(): void {
  }

  getFavorites(): void {
    const user = localStorage.getItem('username')
    this.fetchApiData.getUserFavMovie(user).subscribe((response: any) => {
      this.favorites = response;
      console.log(response)
    })
  }

}
