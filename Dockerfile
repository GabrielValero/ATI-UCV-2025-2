FROM ubuntu

RUN apt-get update -y && apt-get upgrade -y && apt-get install -y apache2 \
 apache2-utils python3 ssl-cert libapache2-mod-wsgi-py3 python3-pip && apt-get clean 

COPY . /var/www/app

COPY mod-wsgi.conf /etc/apache2/sites-available/

RUN a2ensite mod-wsgi.conf && a2enmod wsgi

EXPOSE 80

CMD ["apachectl", "-D", "FOREGROUND"]

# docker build -t apache-image .
# docker run --name apache_container -d -p 8080:80 apache-image
