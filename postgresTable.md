CREATE TABLE reports (
  id serial,
  priority varchar(100),
  location_lat float,
  location_lon float,
  address varchar(300),
  image_url varchar(500),
  archived boolean,
  createdDate timestamp DEFAULT(CURRENT_TIMESTAMP()),

  PRIMARY KEY (id)
);

CREATE TABLE reports (id serial,priority varchar(100),location_lat float,location_lon float,address varchar(300),image_url varchar(500),archived boolean,createdDate timestamp DEFAULT(NOW()),PRIMARY KEY (id));