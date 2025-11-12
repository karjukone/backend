CREATE USER 'cats'@'localhost' IDENTIFIED BY 'tosisalainen';
GRANT ALL PRIVILEGES ON `wskcats`.* TO 'cats'@'localhost';
FLUSH PRIVILEGES;