# Hapi Cacher

> A module for caching API requests for a limited time to prevent unnecessary API requests and save you API calls.

## How To Install
```bash
npm install --save hapi-cacher

```

## How To Use

```js
const hapi = require('hapi-cacher');

hapi.get(url, duration); //Returns a promise

//Example
hapi.get('https://api.chucknorris.io/jokes/random', '24hours')
 .then(value => {
   console.log(value);
 });

 //Example 2 - 5 Milliseconds before updating cached value
 hapi.get('https://api.chucknorris.io/jokes/random', '5x')
 .then(value => {
   console.log(value);
 });
```

The duration determines how long before the cached value is updated. Once you set a duration, you can forget about it in future API calls with the same url, and call the function with just the url.