// src/types/app.ts
export interface MovieListProps {
  title: string
  path: string
  coverType: 'poster' | 'backdrop'
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  genres: any[];
  onSelectGenre: (genreId: number | null) => void;
}

export interface MovieSearchProps {
  movies: Movie[];
}

export interface GenreListProps {
  genres: any[];
  selectedGenreId: number | null;
  onSelectGenre: (genreId: number | null) => void;
}

export interface MovieItemProps {
  movie: Movie
  size: { width: number; height: number }
  coverType: 'poster' | 'backdrop'
}

export interface MovieDetailProps {
  route: {
    params: {
      id: number;
    };
  };
  size: {
    width: number;
    height: number;
  };
  coverType: "backdrop" | "poster";
}

export interface FavoriteContextProps {
  favoriteMovies: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

export interface Movie {
   backdrop_path: string
   genres: { id: number; name: string }
   homepage: string
   id: number
   original_title: string
   overview: string
   popularity: number
   poster_path: number
   original_language: string
   production_companies: {
     id: number
     logo_path: string
     name: string
     origin_country: string
   }
   production_countries: {
     iso_3166_1: string
     name: string
   }
   release_date: Date
   revenue: number
   runtime: number
   spoken_languages: {
     english_name: string
     iso_639_1: string
     name: string
   }
   status: string
   tagline: string
   title: string
   video: boolean
   vote_average: number
   vote_count: number
}