import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "../screens/Search";
import MovieDetail from "../screens/MovieDetail";

// Membuat stack navigator menggunakan createNativeStackNavigator dari react-navigation/native-stack
const Stack = createNativeStackNavigator();

// Komponen SearchStackNavigation untuk menampilkan navigasi stack untuk halaman pencarian
const SearchStackNavigation = (): JSX.Element => (
  <Stack.Navigator>
    {/* Screen untuk halaman pencarian film */}
    <Stack.Screen
      name="SearchList" // Nama screen untuk halaman pencarian film
      component={Search} // Komponen yang akan ditampilkan saat navigasi ke screen ini
      options={{ title: "Search Movies" }} // Opsi untuk konfigurasi tampilan header, judul ditetapkan sebagai "Search Movies"
    />
    {/* Screen untuk menampilkan detail film */}
    <Stack.Screen
      name="MovieDetail" // Nama screen untuk menampilkan detail film
      component={MovieDetail} // Komponen yang akan ditampilkan saat navigasi ke screen ini
      options={{ title: "Movie Detail" }} // Opsi untuk konfigurasi tampilan header, judul ditetapkan sebagai "Movie Detail"
    />
  </Stack.Navigator>
);

export default SearchStackNavigation;
