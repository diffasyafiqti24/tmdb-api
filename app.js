const express = require('express');
const dotenv = require('dotenv');
const validateQuery = require('./middleware');

dotenv.config();

const app = express();

app.get('/movie/search', validateQuery, async (req, res) => {
  const query = req.query.q;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`
    );

    const data = await response.json();

    const hasil = data.results
      .filter(movie => movie.release_date)
      .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
      .map(movie => ({
        judul: movie.title,
        rilis: movie.release_date,
        rating: movie.vote_average
      }));

    res.json(hasil);

  } catch (error) {
    res.status(500).json({
      error: "Gagal mengakses API TMDb"
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di http://localhost:${process.env.PORT}`);
});
