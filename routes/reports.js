const express = require('express');
const router = express.Router();

const { Client } = require('pg');
const clientPreferences = {
  connectionString: process.env.DATABASE_URL
}


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
  });
});

router.post('/', async function(req, res, next) {

  const { long, lat, priority, address, imageUrl } = req.body
  const query = `INSERT INTO reports (priority, location_lat, location_lon, address, image_url, archived) VALUES ('${priority}','${lat}','${long}','${address}','${imageUrl}','false')`
  try{
    const client = new Client(clientPreferences);
    await client.connect();

    const tables = await client.query(`SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name;`)
    console.log("tables", tables)

    const data = await client.query(query)
    console.log("Successfully inserted", req.body)
    console.log("data", data)
    res.send(data)
  } catch (err) {
    console.error(err)
    next(err)
  } finally {
    client.close()
  }
})

module.exports = router;
