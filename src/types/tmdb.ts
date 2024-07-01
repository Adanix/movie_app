// Import nilai API_ACCESS_TOKEN dari modul @env
import { API_ACCESS_TOKEN } from "@env";

// URL dasar API yang digunakan dalam aplikasi
const API_URL = "https://api.themoviedb.org/3";

// Fungsi untuk mengambil daftar genre film dari API
export const fetchGenres = async () => {
  try {
    const response = await fetch(`${API_URL}/genre/movie/list`, {
      headers: {
        Authorization: `Bearer ${API_ACCESS_TOKEN}`, // Menggunakan token akses untuk otorisasi
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch genres");
    }
    const data = await response.json();
    // console.log("Fetched genres data:", data); // Log data respons dari API
    if (!data.genres) {
      throw new Error("Genres not found in API response");
    }
    return data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

// Fungsi untuk mencari film berdasarkan query pencarian
export const fetchMoviesBySearch = async (query: string) => {
  try {
    const response = await fetch(`${API_URL}/search/movie?query=${query}`, {
      headers: {
        Authorization: `Bearer ${API_ACCESS_TOKEN}`, // Menggunakan token akses untuk otorisasi
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch movies by search");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies by search:", error);
    throw error;
  }
};

// Fungsi untuk mengambil daftar film berdasarkan genre
export const fetchMoviesByGenre = async (genreId: number) => {
  try {
    const response = await fetch(
      `${API_URL}/discover/movie?with_genres=${genreId}`,
      {
        headers: {
          Authorization: `Bearer ${API_ACCESS_TOKEN}`, // Menggunakan token akses untuk otorisasi
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movies by genre");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    throw error;
  }
};
