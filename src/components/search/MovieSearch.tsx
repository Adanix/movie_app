import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import type { MovieSearchProps, Movie } from "../../types/app";

// Komponen untuk menampilkan hasil pencarian film
const MovieSearch = ({ movies }: MovieSearchProps): JSX.Element => {
  const navigation = useNavigation();

  // Fungsi untuk menangani ketika pengguna menekan sebuah film
  const handlePress = (movie: Movie) => {
    const pushAction = StackActions.push("MovieDetail", { id: movie.id });
    navigation.dispatch(pushAction); // Mem-push halaman detail film ke stack navigasi
  };

  // Jika tidak ada film ditemukan, tampilkan pesan "No movies found."
  if (movies.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No movies found.</Text>
      </View>
    );
  }

  // Render daftar film yang ditemukan
  return (
    <View style={styles.container}>
      {movies.map((movie) => (
        // Tombol tekan untuk setiap film
        <TouchableOpacity
          key={movie.id}
          style={styles.movieItem}
          onPress={() => handlePress(movie)} // Memanggil handlePress saat tombol ditekan
        >
          {/* Gambar poster film */}
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
            }}
            style={styles.poster}
          />
          {/* Informasi tentang film */}
          <View style={styles.movieInfo}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.overview} numberOfLines={4}>
              {movie.overview}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Styles untuk komponen MovieSearch
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  movieItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  movieInfo: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  overview: {
    fontSize: 14,
    color: "#555",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  emptyText: {
    fontSize: 18,
    color: "#555",
  },
});

export default MovieSearch;
