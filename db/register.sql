INSERT INTO users
(is_admin, username, hash, email,avatar_img_url )
VALUES
($1, $2, $3, $4, $5);