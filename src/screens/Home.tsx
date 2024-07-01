import React from "react"; // Mengimpor React dari modul react
import { ScrollView, View, StatusBar, StyleSheet } from "react-native"; // Mengimpor beberapa komponen dari react-native
import type { MovieListProps } from "../types/app"; // Mengimpor tipe MovieListProps dari folder types
import MovieList from "../components/movies/MovieList"; // Mengimpor komponen MovieList dari folder components

const movieLists: MovieListProps[] = [
  {
    title: "Now Playing in Theater", // Judul untuk daftar film "Now Playing in Theater"
    path: "movie/now_playing?language=en-US&page=1", // Jalur API untuk film yang sedang diputar di bioskop
    coverType: "backdrop", // Tipe gambar sampul adalah backdrop
  },
  {
    title: "Upcoming Movies", // Judul untuk daftar film "Upcoming Movies"
    path: "movie/upcoming?language=en-US&page=1", // Jalur API untuk film yang akan datang
    coverType: "poster", // Tipe gambar sampul adalah poster
  },
  {
    title: "Top Rated Movies", // Judul untuk daftar film "Top Rated Movies"
    path: "movie/top_rated?language=en-US&page=1", // Jalur API untuk film dengan rating tertinggi
    coverType: "poster", // Tipe gambar sampul adalah poster
  },
  {
    title: "Popular Movies", // Judul untuk daftar film "Popular Movies"
    path: "movie/popular?language=en-US&page=1", // Jalur API untuk film populer
    coverType: "poster", // Tipe gambar sampul adalah poster
  },
]; // Deklarasi array movieLists yang berisi beberapa objek MovieListProps

const Home = (): JSX.Element => {
  // Mendefinisikan komponen Home sebagai fungsi yang mengembalikan JSX.Element
  return (
    <ScrollView>
      <View style={styles.container}>
        {movieLists.map((movieList) => (
          <MovieList
            title={movieList.title} // Mengirimkan properti title ke komponen MovieList
            path={movieList.path} // Mengirimkan properti path ke komponen MovieList
            coverType={movieList.coverType} // Mengirimkan properti coverType ke komponen MovieList
            key={movieList.title} // Menambahkan properti key untuk setiap elemen MovieList
          />
        ))}
        <StatusBar translucent={false} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight ?? 32, // Mengatur margin top dengan tinggi StatusBar atau 32 jika StatusBar.currentHeight undefined
    alignItems: "center", // Mengatur alignItems menjadi center
    justifyContent: "center", // Mengatur justifyContent menjadi center
    rowGap: 16, // Mengatur jarak antar baris menjadi 16
  },
}); // Mendefinisikan gaya untuk komponen menggunakan StyleSheet

export default Home; // Mengekspor komponen Home sebagai default
