import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import type { GenreListProps } from "../../types/app";

// Komponen untuk menampilkan daftar genre dengan pilihan genre yang dapat dipilih
const GenreList = ({
  genres,
  selectedGenreId,
  onSelectGenre,
}: GenreListProps): JSX.Element | null => {
  // Jika tidak ada genre atau genre kosong, kembalikan null
  if (!genres || genres.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Judul "Genres" */}
      <Text style={styles.heading}>Genres</Text>
      {/* Mapping setiap genre menjadi TouchableOpacity */}
      {genres.map((genre) => (
        <TouchableOpacity
          key={genre.id}
          style={[
            styles.genreButton,
            // Menambahkan style selected jika genre dipilih
            genre.id === selectedGenreId ? styles.selectedGenreButton : null,
          ]}
          onPress={() =>
            // Memanggil onSelectGenre dengan id genre yang dipilih atau null jika sudah dipilih
            onSelectGenre(genre.id === selectedGenreId ? null : genre.id)
          }
        >
          {/* Nama genre */}
          <Text style={styles.genreButtonText}>{genre.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Styles untuk komponen GenreList
const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  genreButton: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  selectedGenreButton: {
    backgroundColor: "#007BFF",
  },
  genreButtonText: {
    fontSize: 16,
    color: "#333",
  },
});

export default GenreList;
