const express = require('express');
const router = express.Router();

const { Client } = require('pg');
const clientPreferences = {
  connectionString: process.env.DATABASE_URL
}


/* GET users listing. */
router.get('/', async function(req, res, next) {
  const client = new Client(clientPreferences);
  await client.connect();

  const query = `SELECT * FROM reports`;
  try{
    const data = await client.query(query)
    res.send(data.rows)
  } catch (err) {
    console.error(err)
    next(err)
  } finally {
    client.end()
  }
});

router.get('/:reportId', async function(req, res, next) {
  const client = new Client(clientPreferences)
  await client.connect()

  const query = `SELECT * FROM reports WHERE id=${req.params.reportId}`
  try{
    const data = await client.query(query)
    res.send(data.rows[0])
  } catch (err) {
    console.error(err)
    next(err)
  } finally {
    client.end()
  }
})

router.post('/', async function(req, res, next) {
  const client = new Client(clientPreferences);
  await client.connect();

  const { long, lat, priority, address, imageUrl } = req.body
  const query = `INSERT INTO reports (priority, location_lat, location_lon, address, image_url, archived) VALUES ('${priority}','${lat}','${long}','${address}','${imageUrl}','false');`
  try{
    const data = await client.query(query)
    console.log("Successfully inserted", req.body)
    console.log("data", data)
    res.send('Success')
  } catch (err) {
    console.error(err)
    next(err)
  } finally {
    client.end()
  }
})

router.delete('/:reportId', async function(req, res, next) {
  const client = new Client(clientPreferences);
  await client.connect();
  
  const query = `DELETE FROM reports WHERE id=${req.params.reportId}`

  try{
    await client.query(query)

    console.log("Successfully deleted", req.params.reportId)
    res.send('Success')
  } catch(err) {
    console.error(err)
    next(err)
  } finally {
    client.end()
  }
})

module.exports = router;
