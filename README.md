![SongCommunity Logo](/client/src/style/trylogo.png) 

# SongCommunity 
A simple website based on MERN framework.

Project developed for the DataBase II exam at Università degli Studi di Salerno.

The project is a raw Spotify replica that utilizes queries to calculate the distance between songs in order to suggest similar songs to users (clustering but without clustering).

## Dataset

The dataset is available [here](https://www.kaggle.com/datasets/maharshipandya/-spotify-tracks-dataset?resource=download). We performed a little bit of preprocessing to adapt the dataset to MongoDB and generated random fake users with random favorite songs.

## Project Structure

We employed the MERN stack (MongoDB, Express, React, Node) for the development of this project.

### Setup Instructions

1. Download the dataset and perform the necessary preprocessing to adapt it to MongoDB.
2. Import the preprocessed JSON files into two collections in MongoDB, namely "Songs" and "Users."
3. Create a `.env` file in the root folder and add the following line, replacing `<yourDB/SongCommunity URL>` with your MongoDB connection URL:
  DB_URL=<yourDB/SongCommunity URL>

4. Install all the dependencies using `yarn` for the client folder and `npm` for the backend (root folder).
5. Use `nodemon` to start the backend.
6. You are all set! Launch the application and start exploring SongCommunity.

## Features

- Discover and listen to songs based on calculated distances from your favorites.
- Enjoy a Spotify-like experience with song suggestions.
- Explore the dataset and discover new music.



