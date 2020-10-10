// Pair this with axios.js which contains the baseURL: "https://api.themoviedb.org/3", to create an instance
const API_KEY = "03e40a078aac8bccb46a919e07d8c960";
// The params like &with_networks=213 is specific from the tmdb. 213 specifies a keycode
const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,  
  fetchByRevenue: `/discover/movie?api_key=${API_KEY}&language=en-KR&sort_by=revenue.desc&include_adult=true&include_video=true&with_original_language=ko`,
  fetchKoreanPopular: `/discover/movie?api_key=${API_KEY}&language=en-KR&sort_by=popularity.desc&include_adult=true&include_video=true&with_original_language=ko`,
  fetchKoreanTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-KR&with_original_language=ko`,
  fetchChoiMinsik: `/discover/movie?api_key=${API_KEY}&language=en-KR&sort_by=popularity.desc&include_adult=true&include_video=true&with_cast=64880&with_original_language=ko`,
};

export default requests;
