var express = require('express');
var router = express.Router();

const { Client } = require('pg');
const clientPreferences = {
  connectionString: process.env.DATABASE_URL
}

router.post('/', async (req, res, next) => {
  const client = new Client(clientPreferences);
  await client.connect();

  try {
    const users = await client.query(`SELECT * FROM users WHERE email='${req.body.email}'`)

    console.log("user rows", users.rows)

    if (!users.rows.length) {
      const query = `INSERT INTO users (email, name) VALUES ('${req.body.email}', '${req.body.name}')`
      const insertion = await client.query(query)
      console.log('insertion', insertion.rows)
      res.send({
        businesses: []
      })
    } else {
      const [ user ] = users.rows
      const query = `SELECT * FROM businesses, user_business WHERE user_business.business_id = businesses.id AND user_business.user_id = '${user.id}'`
      const userBusinesses = await client.query(query)
      console.log("user businesses", userBusinesses.rows)
      res.send({
        businesses: userBusinesses.rows
      })
    }
  } catch (err) {
    console.error(err)
    next(err)
  } finally {
    client.end()
  }
})

module.exports = router;