# Pizza cart frontend

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# For developing: serve with hot reload at localhost:3000
$ npm run dev

# For production: generate static project
$ npm run generate
```

All generated files you can find in "/public" directory.



## Configure deploy (Heroku)

- `heroku login`
- The popup of login will appear, click on Login button
- Procfile with all needed commands is already in package
- Add configuration in Heroku (Settings->Reveal Config Vars) base on `.env` file
- `$ git push heroku master`
