// src/pages/movies.tsx
import { useEffect, useState } from 'react'
import type { Movie, MovieResponse } from '../types/movie'
import axios from 'axios'

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([])

  console.log(movies)

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjY5MWFhOWUzMGI0NWNlYWU4ZjdiNjk1ZDZhNmVkMyIsIm5iZiI6MTc2MDc4NDQzMS42NTIsInN1YiI6IjY4ZjM3MDJmZmZjN2IwNDNjYzM5MTU2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NCL0ywR8drEr_AWyCHv7vP0pgr-bgc2WZ0IyfdwXYcY`,
          },
        },
      )
      setMovies(data.results)
    }
    fetchMovies()
  }, [])

  return (
    <ul className='grid grid-cols-6 gap-2 p-4 max-w-270 mx-auto'>
      {movies.map((movie) => (
        <li key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className='w-full rounded-xl'
          ></img>
        </li>
      ))}
    </ul>
  )
}

export default MoviesPage
