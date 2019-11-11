DROP TABLE IF EXISTS users;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  is_admin BOOLEAN default false,
  username VARCHAR(120),
  hash text,
  email VARCHAR(120),
  avatar_img_url VARCHAR(120)
  
)

CREATE TABLE posts(
  post_id SERIAL PRIMARY KEY,
  post_user_id INT,  
  content_of_post VARCHAR(250),
  likes INT,
  FOREIGN KEY (post_user_id) REFERENCES users (id)
)
CREATE TABLE forum(
forum_id SERIAL PRIMARY KEY,
forum_name VARCHAR (15),
followers INTEGER
)
UPDATE users SET
avatar_img_url = 'https://res.cloudinary.com/kevin14/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1569961335/pf0ik377vomfuoydokup'
WHERE id = 2

create table comments(
  comment_id serial primary key,
  comment varchar(150),
  user_id integer,
  post_id integer,
  foreign key (user_id) references users(id),
  foreign key (post_id) references posts(post_id)
)
