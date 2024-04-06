FROM postgres:alpine
COPY create.sql /docker-entrypoint-initdb.d/
ENV POSTGRES_USER app
ENV POSTGRES_PASSWORD app
ENV POSTGRES_DB app
EXPOSE 5432
