const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGU2OTQ5YWZkYTk3MzllMGIwZGMzNzE5MmFiYTk1MiIsIm5iZiI6MTc3NTUyOTc0OS45MDQsInN1YiI6IjY5ZDQ2ZjE1Mzk4ZGFmNjQ0OWVkZjVhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QqWkl9uqf7OoT0BM41s5FqiSKOg0uPnsPyBte6fD2ww";

const options = {
  method: "GET",
  headers: { Authorization: `Bearer ${TOKEN}`, accept: "application/json" },
};

export async function fetchAPI(path: string) {
  const response = await fetch(`${BASE_URL}${path}`, options);
  return response.json();
}
