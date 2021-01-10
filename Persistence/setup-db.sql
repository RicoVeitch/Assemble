CREATE USER 'appuser'@'%' IDENTIFIED WITH mysql_native_password BY 'Pa$$w0rd';
GRANT ALL PRIVILEGES ON *.* TO 'appuser'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;