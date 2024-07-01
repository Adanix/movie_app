import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import SearchBar from "../components/search/SearchBar";
import MovieSearch from "../components/search/MovieSearch";
import {
  fetchMoviesBySearch,
  fetchGenres,
  fetchMoviesByGenre,
} from "../types/tmdb";

/**
 * Komponen Search untuk menampilkan antarmuka pencarian film.
 * Mengelola pencarian film berdasarkan kueri teks dan pemilihan genre.
 */
const Search: React.FC = () => {
  // State hooks untuk mengelola film, genre, status loading, status pencarian aktif, dan genre terpilih
  const [movies, setMovies] = useState<any[]>([]); // Array film yang diambil dari API
  const [genres, setGenres] = useState<any[]>([]); // Array genre yang tersedia diambil dari API
  const [loading, setLoading] = useState(false); // Indikator status loading
  const [searchActive, setSearchActive] = useState(false); // Boolean untuk melacak apakah pencarian aktif
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null); // ID genre yang terpilih

  // Effect hook untuk mengambil genre saat komponen dimount
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresData = await fetchGenres(); // Mengambil data genre dari API TMDB
        setGenres(genresData); // Memperbarui state dengan data genre yang diambil
      } catch (error) {
        console.error("Error fetching genres:", error);
        setGenres([]); // Mengatur state genre menjadi array kosong jika terjadi error
      }
    };

    loadGenres(); // Memanggil fungsi untuk mengambil genre
  }, []); // Array dependensi kosong agar effect hanya dijalankan sekali saat komponen dimount

  // Fungsi debounce kustom untuk menunda eksekusi pencarian
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: number;
    return function (...args: any[]) {
      clearTimeout(timeoutId); // Membersihkan timeout sebelumnya
      timeoutId = setTimeout(() => func(...args), delay); // Mengatur timeout baru untuk eksekusi fungsi
    };
  };

  // Handler untuk pencarian film berdasarkan teks dengan debounce
  const handleSearch = debounce(async (query: string) => {
    if (query.length === 0) {
      // Jika kueri pencarian kosong
      setSearchActive(false); // Mengatur status pencarian menjadi tidak aktif
      if (selectedGenreId !== null) {
        handleGenreSelect(selectedGenreId); // Memanggil handleGenreSelect jika genre terpilih
      } else {
        setMovies([]); // Mengosongkan array film jika tidak ada genre terpilih
      }
      return;
    }

    setLoading(true); // Mengatur indikator loading menjadi aktif
    setSearchActive(true); // Mengatur status pencarian menjadi aktif
    setSelectedGenreId(null); // Mengatur ulang ID genre terpilih
    try {
      const moviesData = await fetchMoviesBySearch(query); // Mengambil data film berdasarkan kueri pencarian
      setMovies(moviesData); // Memperbarui state dengan data film yang diambil
    } catch (error) {
      console.error("Error fetching movies by search:", error); // Mencatat error jika pengambilan data film gagal
      setMovies([]); // Mengatur array film menjadi kosong saat terjadi error
    }
    setLoading(false); // Mengatur indikator loading menjadi tidak aktif setelah pengambilan data selesai
  }, 300); // debounce untuk menunda eksekusi pencarian selama 300ms untuk mengoptimalkan panggilan API

  // Handler untuk pemilihan genre
  const handleGenreSelect = async (genreId: number | null) => {
    if (genreId === null) {
      // Jika ID genre null (Semua genre terpilih)
      setMovies([]); // Mengosongkan array film
      setSelectedGenreId(null); // Mengatur ulang ID genre terpilih
      return;
    }

    setLoading(true); // Mengatur indikator loading menjadi aktif
    setSearchActive(false); // Mengatur status pencarian menjadi tidak aktif
    setSelectedGenreId(genreId); // Mengatur ID genre terpilih
    try {
      const moviesData = await fetchMoviesByGenre(genreId); // Mengambil data film berdasarkan genre yang dipilih
      setMovies(moviesData); // Memperbarui state dengan data film yang diambil
    } catch (error) {
      console.error("Error fetching movies by genre:", error); // Mencatat error jika pengambilan data film gagal
      setMovies([]); // Mengatur array film menjadi kosong saat terjadi error
    }
    setLoading(false); // Mengatur indikator loading menjadi tidak aktif setelah pengambilan data selesai
  };

  // Metode render untuk komponen Search
  return (
    <ScrollView style={styles.container}>
      {/* Komponen SearchBar untuk input pengguna dan pemilihan genre */}
      <SearchBar
        onSearch={handleSearch} // Mengirimkan fungsi handleSearch ke komponen SearchBar
        genres={genres} // Mengirimkan array genres ke komponen SearchBar
        onSelectGenre={handleGenreSelect} // Mengirimkan fungsi handleGenreSelect ke komponen SearchBar
      />
      {/* Menampilkan indikator loading atau komponen MovieSearch berdasarkan status loading */}
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" /> // Menampilkan ActivityIndicator jika loading true
      ) : (
        <MovieSearch movies={movies} /> // Merender komponen MovieSearch dengan data film yang diambil
      )}
    </ScrollView>
  );
};

// Stylesheet untuk komponen Search
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default Search; // Ekspor komponen Search sebagai default
