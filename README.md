# URL Shortener

This is a very naive implementation of a URL shortener node app, just for fun. There's no proper validation or form data sanitization. It doesn't check for existing entries. There's a lot missing.

It uses a json file db, [lowdb](https://github.com/typicode/lowdb) to store entries, which in turn are generated with [nanoid](https://github.com/ai/nanoid).

## Usage

    yarn install
    yarn start

Once the app is running, you can access the website at <http://localhost:8000>.
