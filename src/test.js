const hapi = require('./index');

hapi.get('https://api.chucknorris.io/jokes/random')
.then(value => {
  console.log(value);
  hapi.get('https://api.chucknorris.io/jokes/random')
  .then(value => 
    {console.log(value);
  });

});