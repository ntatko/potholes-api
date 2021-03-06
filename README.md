# Geokit-API

## Postgres Tables
We use postgres to house data, using the following tables

### Reports

The actual reported things

```sql
CREATE TABLE reports (
  id SERIAL,
  location_lat float,
  location_lon float,
  address VARCHAR(300),
  image_url VARCHAR(500),
  fixed BOOLEAN,
  createdDate TIMESTAMP DEFAULT(NOW()),
  description VARCHAR(500),
  fixedDate TIMESTAMP,
  reportedBy INT NOT NULL,
  fixedBy INT,

  PRIMARY KEY (id),
  FOREIGN KEY (reportedBy) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (fixedBy) REFERENCES users(id) ON DELETE SET NULL
);
```

Copy and paste
```sql
DROP TABLE IF EXISTS reports CASCADE;
CREATE TABLE reports (id SERIAL, location_lat float, location_lon float, address VARCHAR(300), image_url VARCHAR(500), fixed BOOLEAN, createdDate TIMESTAMP DEFAULT(NOW()), description VARCHAR(500), fixedDate TIMESTAMP, reportedBy INT NOT NULL, fixedBy INT, PRIMARY KEY (id), FOREIGN KEY (reportedBy) REFERENCES users(id) ON DELETE SET NULL, FOREIGN KEY (fixedBy) REFERENCES users(id) ON DELETE SET NULL);
```

### Business

```sql
CREATE TABLE businesses (
  id SERIAL,
  business_name VARCHAR(100),
  createdDate TIMESTAMP DEFAULT(NOW()),

  PRIMARY KEY (id)
);
```

Copy and paste
```sql
DROP TABLE IF EXISTS businesses CASCADE;
CREATE TABLE businesses (id SERIAL, business_name VARCHAR(100), createdDate TIMESTAMP DEFAULT(NOW()), PRIMARY KEY (id));
```

### Users

The users of the app

```sql
CREATE TABLE users (
  id serial,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(14),
  name VARCHAR(300),
  phone_verified BOOLEAN DEFAULT(false),
  email_verified BOOLEAN DEFAULT(false),
  createdDate TIMESTAMP DEFAULT(NOW()),

  PRIMARY KEY(id)
);
```

Copy and paste
```sql
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (id serial, email VARCHAR(100) NOT NULL, phone VARCHAR(14), name VARCHAR(300), phone_verified BOOLEAN DEFAULT(false), email_verified BOOLEAN DEFAULT(false), createdDate TIMESTAMP DEFAULT(NOW()), PRIMARY KEY(id));
```

## Relational Tables

To match the above tables to one another

### Business + Category

This is a one to many relationship. Each business will come up with their own categories.

```sql
CREATE TABLE categories (
  id SERIAL,
  category VARCHAR(100),
  requires_image BOOLEAN DEFAULT(true),
  color VARCHAR(10),
  business_id INT NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
);
```

copy and paste
```sql
DROP TABLE IF EXISTS categories;
CREATE TABLE categories (id SERIAL, category VARCHAR(100), requires_image BOOLEAN DEFAULT(true), color VARCHAR(10), business_id INT NOT NULL, PRIMARY KEY (id), FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE);
```

### Users + Business

Joins users and businesses. Might be one to many, but at the moment, creating a system that can handle many to many.

```sql
CREATE TABLE user_business (
  id SERIAL,
  user_id INT NOT NULL,
  business_id INT NOT NULL,
  owner BOOLEAN DEFAULT(false),
  write_access BOOLEAN DEFAULT(false),

  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
);
```

Copy and paste
```sql
DROP TABLE IF EXISTS user_business;
CREATE TABLE user_business (id SERIAL, user_id INT NOT NULL, business_id INT NOT NULL, owner BOOLEAN DEFAULT(false), write_access BOOLEAN DEFAULT(false), PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE);
```

### Business + Reports

Joins reports and businesses.

```sql
CREATE TABLE business_report (
  id SERIAL,
  business_id INT NOT NULL,
  report_id INT NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE,
  FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE
);
```

copy and paste
```sql
DROP TABLE IF EXISTS business_report;
CREATE TABLE business_report (id SERIAL, business_id INT NOT NULL, report_id INT NOT NULL, PRIMARY KEY (id), FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE, FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE);
```

### Assignments (Users + Reports)

We may want to assign a user to a report someday

```sql
CREATE TABLE assignments (
  id SERIAL,
  user_id INT NOT NULL,
  report_id INT NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE
);
```

copy and paste
```sql
DROP TABLE IF EXISTS assignments;
CREATE TABLE assignments (id SERIAL, user_id INT NOT NULL, report_id INT NOT NULL, PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE);
```
