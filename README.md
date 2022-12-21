
# MOVIE API

This server is created to store information about movies, do CRUD operations, import movies from a text file and write them to  database. Also, the server supports user authorization using the JWT

## Technologies

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,express,sqlite,docker" />
  </a>
</p>

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`ACCESS_TOKEN_SECRET`


## Run Locally

Clone the project

```bash
  git clone https://github.com/CentralMatthew/webby-lab-movie-api.git
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Run app on docker containter
Pull docker image from docker hub

```bash
    docker pull matthew379/movies-api:latest
```
Run docker image
```bash
   docker run --name movies -p 8000:8080 -e PORT=<YOUR_PORT> -e ACCESS_TOKEN_SECRET=<RANDOM_STRING> matthew379/movies-api:latest
```
