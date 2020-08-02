var express = require('express');
var router = express.Router();

const { Client } = require('pg');
const clientPreferences = {
  connectionString: process.env.DATABASE_URL
}

const primaryTables = [ // found in the readme.md file
  `DROP TABLE IF EXISTS businesses CASCADE;`,
  `CREATE TABLE businesses (id SERIAL, business_name VARCHAR(100), createdDate TIMESTAMP DEFAULT(NOW()), PRIMARY KEY (id));`,
  `DROP TABLE IF EXISTS users CASCADE;`,
  `CREATE TABLE users (id serial, email VARCHAR(100) NOT NULL, phone VARCHAR(14), name VARCHAR(300), phone_verified BOOLEAN DEFAULT(false), email_verified BOOLEAN DEFAULT(false), createdDate TIMESTAMP DEFAULT(NOW()), PRIMARY KEY(id));`,
];

const secondaryTables = [
  `DROP TABLE IF EXISTS reports CASCADE;`,
  `CREATE TABLE reports (id SERIAL, location_lat float, location_lon float, address VARCHAR(300), image_url VARCHAR(500), fixed BOOLEAN, createdDate TIMESTAMP DEFAULT(NOW()), description VARCHAR(500), fixedDate TIMESTAMP, reportedBy INT NOT NULL, fixedBy INT, PRIMARY KEY (id), FOREIGN KEY (reportedBy) REFERENCES users(id) ON DELETE SET NULL, FOREIGN KEY (fixedBy) REFERENCES users(id) ON DELETE SET NULL);`,
  `DROP TABLE IF EXISTS categories;`,
  `CREATE TABLE categories (id SERIAL, category VARCHAR(100), requires_image BOOLEAN DEFAULT(true), color VARCHAR(10), business_id INT NOT NULL, PRIMARY KEY (id), FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE);`,
  `DROP TABLE IF EXISTS user_business;`,
  `CREATE TABLE user_business (id SERIAL, user_id INT NOT NULL, business_id INT NOT NULL, owner BOOLEAN DEFAULT(false), write_access BOOLEAN DEFAULT(false), PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE);`,
  `DROP TABLE IF EXISTS business_report;`,
  `CREATE TABLE business_report (id SERIAL, business_id INT NOT NULL, report_id INT NOT NULL, PRIMARY KEY (id), FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE, FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE);`,
  `DROP TABLE IF EXISTS assignments;`,
  `CREATE TABLE assignments (id SERIAL, user_id INT NOT NULL, report_id INT NOT NULL, PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE);`
]

router.get('/', async (req, res, next) => {
  if (req.body.password !== 'password') {
    next(Error("You didn't give us a password..."));
    return;
  }

  const client = new Client(clientPreferences);
  await client.connect();

  try {
    const response1 = await client.query(primaryTables[0]);
    const response2 = await client.query(primaryTables[1]);
    const response3 = await client.query(primaryTables[2]);
    const response4 = await client.query(primaryTables[3]);

    const responses = [response1, response2, response3, response4];

    const secondResponse1 = await client.query(secondaryTables[0]);
    const secondResponse2 = await client.query(secondaryTables[1]);
    const secondResponse3 = await client.query(secondaryTables[2]);
    const secondResponse4 = await client.query(secondaryTables[3]);
    const secondResponse5 = await client.query(secondaryTables[4]);
    const secondResponse6 = await client.query(secondaryTables[5]);
    const secondResponse7 = await client.query(secondaryTables[6]);
    const secondResponse8 = await client.query(secondaryTables[7]);
    const secondResponse9 = await client.query(secondaryTables[8]);
    const secondResponse10 = await client.query(secondaryTables[9]);

    const secondResponses = [
      secondResponse1,
      secondResponse2,
      secondResponse3,
      secondResponse4,
      secondResponse5,
      secondResponse6,
      secondResponse7,
      secondResponse8,
      secondResponse9,
      secondResponse10
    ];

  res.send("responses: " + [ ...responses, ...secondResponses].toString())

  } catch (err) {
    next(err)
    console.error(err)
  } finally {
    client.end()
  }
});

router.get('/sqltables', async (req, res, next) => {
  const client = new Client(clientPreferences);
  await client.connect();

  try {
    const response = await client.query('SELECT table_name FROM information_schema.tables WHERE table_schema=\'public\'');
    res.send(response);
  } catch (err) {
    console.error(err);
    next(err);
  } finally {
    client.end();
  }

})

module.exports = router;
