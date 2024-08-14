# Use the official MySQL image from Docker Hub
FROM mysql:8.0

# Set environment variables for the database
ENV MYSQL_DATABASE=nestjs_db
ENV MYSQL_ROOT_PASSWORD=yourpassword
ENV MYSQL_USER=nestjs_user
ENV MYSQL_PASSWORD=nestjs_password

# Expose the MySQL port
EXPOSE 3306

# Run the MySQL server
CMD ["mysqld"]