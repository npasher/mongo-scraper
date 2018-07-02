

Creation of a web app that lets users view and leave notes on the latest [Car and Driver&copy;](https://www.caranddriver.com/) articles.

Whenever a user visits the [site](https://flannel-sorry-66311.herokuapp.com/), the app scrapes stories from [Car and Driver&copy;](https://www.caranddriver.com/) and displays them for the user. Each scraped article is saved to the application database. 

~~Users are able to leave notes on the articles displayed and may revisit them later.~~ The notes are saved to the database as well and associated with their articles. Users are able to delete notes left on articles. ~~All stored notes are visible to every user.~~


## Dependencies:

[Axios](https://www.npmjs.com/package/axios)

[Body-Parser](https://www.npmjs.com/package/body-parser)

[Cheerio](https://www.npmjs.com/package/cheerio)

[Express](https://www.npmjs.com/package/express)

[Express-Handlebars](https://www.npmjs.com/package/express-handlebars)

[Mongoose](https://www.npmjs.com/package/mongoose)

[Morgan](https://www.npmjs.com/package/morgan)

[Request](https://www.npmjs.com/package/request)
