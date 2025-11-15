# LeetCode Problem Service API

This API allows you to manage coding problems similar to LeetCode — including creating, retrieving, updating, and deleting problems.


## 🛣️ API Base URL


All routes are structured using:

- `apiRouter` ➝ `v1Router` ➝ `problemRouter` ➝ `problemController`


## Dependencies
- Express
- bodyParser
- nodemon
- dotenv
- marked (converts markdown into html)
- sanitize-html (remove unsafe tags )
- winston (used for custom logging)
- winston-mongodb (used for storing log in db)

