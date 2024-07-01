import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import type { SearchBarProps } from "../../types/app";

// Komponen SearchBar untuk melakukan pencarian film dan memilih genre
const SearchBar = ({
  onSearch, // Fungsi callback untuk melakukan pencarian
  genres, // Daftar genre film yang tersedia
  onSelectGenre, // Fungsi callback untuk memilih genre
}: SearchBarProps): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false); // State untuk mengatur visibilitas modal
  const [selectedGenre, setSelectedGenre] = useState<string>("Pilih Genre"); // State untuk menyimpan genre yang dipilih

  // Fungsi untuk menangani perubahan teks pada TextInput pencarian
  const handleTextChange = (text: string) => {
    onSearch(text); // Memanggil fungsi pencarian dengan teks input sebagai argumen
  };

  // Fungsi untuk menangani pemilihan genre dari modal
  const handleGenreSelect = (genreId: number | null, genreName: string) => {
    setSelectedGenre(genreName); // Memperbarui genre yang dipilih
    onSelectGenre(genreId); // Memanggil fungsi callback onSelectGenre dengan genreId sebagai argumen
    setModalVisible(false); // Menutup modal setelah memilih genre
  };

  return (
    <View style={styles.container}>
      {/* TextInput untuk melakukan pencarian */}
      <TextInput
        style={styles.input}
        placeholder="Cari film..."
        onChangeText={handleTextChange} // Memanggil handleTextChange saat teks berubah
      />
      {/* Tombol untuk memilih genre */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)} // Menampilkan modal saat tombol ditekan
      >
        <Text style={styles.buttonText}>{selectedGenre}</Text>
      </TouchableOpacity>

      {/* Modal untuk memilih genre */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pilih Genre</Text>
            {/* FlatList untuk menampilkan daftar genre */}
            <FlatList
              data={[{ id: null, name: "Semua Genre" }, ...genres]}
              keyExtractor={(item) =>
                item.id === null ? "all" : item.id.toString()
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.genreItem}
                  onPress={() => handleGenreSelect(item.id, item.name)} // Memanggil handleGenreSelect saat genre dipilih
                >
                  <Text style={styles.genreItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            {/* Tombol untuk menutup modal */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)} // Menutup modal saat tombol ditekan
            >
              <Text style={styles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles untuk komponen SearchBar
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  button: {
    marginLeft: 10,
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  genreItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  genreItemText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default SearchBar;
