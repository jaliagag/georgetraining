const express = require('express');
const app = express();
const port = 3000;
const fetch = require('node-fetch');

app.use(express.static('public'));

app.get('/bookname', async(req, res) => {
  // run fetch code
  const fetchApi = await fetch("https://goodreads-books.p.rapidapi.com/search?q=harry&page=1", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "goodreads-books.p.rapidapi.com",
		"x-rapidapi-key": "5ee916faeamsh91b36098b086d5fp14c4dbjsnaf5a211be41f"
    },
  }
  ); 

  const bookNameResponse = await fetchApi.json();
  console.log(bookNameResponse);
  res.json(bookNameResponse);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});

