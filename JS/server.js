
fetch('https://api.pexels.com/v1/search?query=SUAPESQUISA&per_page=1').then(function(response) {
    response.json().then(function(data) {
      console.log(data);
    });
  }).catch(function(err) {
    console.error('erro', err);
  });