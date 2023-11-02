import React from 'react'
import Slider from 'react-slick'
import { Settings } from '../settings'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { getAllMovies, getAllShows } from '../features/movies/movieSlice'
import MovieCard from './MovieCard';

const MovieListing = () => {
  
  const movies=useSelector(getAllMovies);
  const shows=useSelector(getAllShows);
  const loading = useSelector((state) => state.movies.loading);
  let renderMovies="";
  let renderShows="";

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  renderMovies=movies.Response==="True" ? (
    movies.Search.map((movie,index)=>(
      <MovieCard key={index} data={movie} />
    ))
  ) : (<div className="movies-error"><h3>{movies.Error}</h3></div>)

  renderShows=shows.Response==="True" ? (
    shows.Search.map((movie,index)=>(
      <MovieCard key={index} data={movie} />
    ))
  ) : (<div className="movies-error"><h3>{movies.Error}</h3></div>)
  return (
      <div className="movie-wrapper">
        <div className="movie-list">
          <h2>Movies</h2>
          <div className="movie-container">
            <Slider {...Settings}>{renderMovies}</Slider>
          </div>
        </div>
        <div className="show-list">
          <h2>Shows</h2>
          <div className="movie-container">
            <Slider {...Settings}>{renderShows}</Slider>
          </div>
        </div>
      </div>
  );
}

export default MovieListing