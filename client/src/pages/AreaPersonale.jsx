import React, { Component } from 'react';
import api, { getUserById } from '../api';
import { useState, useEffect } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

class AreaPersonale extends Component {
  constructor(props) {
    super(props);
    const userId = localStorage.getItem('userId');
    // Inizializza lo stato con i dati dell'utente
    this.state = {
      username: '',
      email: '',
      preferite: [],
      similarSongs: {}, // Aggiungi lo stato per le canzoni simili
    };
  }

  componentDidMount = async () => {
    const userId = localStorage.getItem('userId');

    if (userId != null) {
      const userResponse = await api.getUserById(userId);
      const user = userResponse.data.data;

      const username = user.Username;
      const email = user.Email;
      const preferite = user.Preferite;
      const arrayPreferite = [];

      for (const songId of preferite) {
        const canzoneResponse = await api.getSongById(songId);
        const canzone = canzoneResponse.data.data;
        canzone.artists = canzone.artists.join(', ');
        canzone.track_genre = canzone.track_genre.join(', ');

        arrayPreferite.push(canzone);
      }

      this.setState({
        username: username,
        email: email,
        preferite: arrayPreferite,
      });
    }
  };

  searchSimilar = async (songId) => {
    const { preferite, similarSongs } = this.state;

    if (similarSongs[songId] && similarSongs[songId].length>0) {
      // Se le canzoni simili sono già state caricate, esci dalla funzione
      return;
    }

    const similar = await api.getSimilarSongs(songId, preferite);
    const similar_songs = similar.data.data;
    similar_songs.forEach((song) => {
      song.artists = song.artists.join(', ');
      song.track_genre = song.track_genre.join(', ');
    });

    // Aggiorna lo stato delle canzoni simili
    this.setState((prevState) => ({
      similarSongs: {
        ...prevState.similarSongs,
        [songId]: similar_songs,
      },
    }));

  };


  toggleFavorite = async (songId, startingSong) => {

    const { preferite } = this.state;
    const userId = localStorage.getItem('userId');
    console.log({preferite})
    const preferite_ids = preferite.map(pref => pref.song_id)
    console.log({preferite})
    if (preferite_ids.includes(songId)) {
      const updatedFavorites = preferite_ids.filter((id) => id !== songId);
      await api.setUserFavorites(localStorage.getItem('userId'), updatedFavorites);
      const userResponse = await api.getUserById(userId);
      const user = userResponse.data.data;
      const preferite = user.Preferite
      const arrayPreferite = [];

      for (const songId of preferite) {
        const canzoneResponse = await api.getSongById(songId);
        const canzone = canzoneResponse.data.data;
        canzone.artists = canzone.artists.join(', ');
        canzone.track_genre = canzone.track_genre.join(', ');

        arrayPreferite.push(canzone);
      }

      this.setState({preferite: arrayPreferite,});
    } else {
      
      const updatedFavorites = [...preferite_ids, songId];
      await api.setUserFavorites(localStorage.getItem('userId'), updatedFavorites);
      console.log(userId)
      const userResponse = await api.getUserById(userId);
      const user = userResponse.data.data;
      const preferite = user.Preferite
      const arrayPreferite = [];

      for (const songId of preferite) {
        const canzoneResponse = await api.getSongById(songId);
        const canzone = canzoneResponse.data.data;
        canzone.artists = canzone.artists.join(', ');
        canzone.track_genre = canzone.track_genre.join(', ');

        arrayPreferite.push(canzone);
      }

      this.setState({preferite: arrayPreferite,});
    }

    this.setState((prevState) => ({
      similarSongs: {
        ...prevState.similarSongs,
        [startingSong]: [],
      }
    }))
  };

  render() {
    const { username, email, preferite, similarSongs } = this.state;

    const columns = [
      {
        Header: 'Song N.',
        accessor: 'song_id',
        filterable: true,
      },
      {
        Header: 'Track Name',
        accessor: 'track_name',
        filterable: true,
        filterMethod: (filter, row) => {
          const id = row[filter.id];
          return id.toLowerCase().includes(filter.value.toLowerCase());
        },
      },
      {
        Header: 'Album',
        accessor: 'album_name',
        filterable: true,
        filterMethod: (filter, row) => {
          const id = row[filter.id];
          return id.toLowerCase().includes(filter.value.toLowerCase());
        },
      },
      {
        Header: 'Genre',
        accessor: 'track_genre',
        filterable: true,
        filterMethod: (filter, row) => {
          const id = row[filter.id];
          return id.toLowerCase().includes(filter.value.toLowerCase());
        },
      },
      {
        Header: 'Artists',
        accessor: 'artists',
        filterable: true,
        filterMethod: (filter, row) => {
          const id = row[filter.id];
          return id.toLowerCase().includes(filter.value.toLowerCase());
        },
      },
      {
        Header: 'Search similar',
        Cell: ({ original }) => (
          <Button variant="primary" className="btn btn-dark" onClick={() => this.searchSimilar(original.song_id)}>Cerca Simili</Button>
        ),
        filterable: false,
      },
      {
        Header: 'Favorite',
        Cell: ({ original }) => ( 
          <FontAwesomeIcon
            icon={faHeart}
            color={preferite.includes(original.song_id) ? 'lightgray' : 'red'}
            onClick={() => this.toggleFavorite(original.song_id, original.song_id)}
            style={{ cursor: 'pointer' }}
          />
        ),
      },
    ];

    const expandedRowRender = (row) => {
      const similarSongsData = similarSongs[row.original.song_id];

      return (
        <div>
          {similarSongsData && similarSongsData.length > 0 ? (
            <Container>
              <div className="d-flex justify-content-between">
                {similarSongsData.map((song) => (
                  <Card key={song.song_id} style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>{song.track_name}</Card.Title>
                      <Card.Text>
                        <strong>Album: </strong>
                        {song.album_name}
                        <br />
                        <strong>Genre: </strong>
                        {song.track_genre}
                        <br />
                        <strong>Artists: </strong>
                        {song.artists}
                      </Card.Text>
                      <FontAwesomeIcon
                        icon={faHeart}
                        color={preferite.includes(song.song_id) ? 'red' : 'lightgray'}
                        onClick={() => this.toggleFavorite(song.song_id, row.original.song_id)}
                        style={{ cursor: 'pointer' }}
                      />
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Container>
          ) : (
            <p></p>
          )}
        </div>
      );
    };

    return (
      <div className="container mt-4">
        <h1 className="mb-4">Area Personale</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Benvenuto, {username}!</h5>
            <p className="card-text">Email: {email}</p>
            <h6 className="card-subtitle mb-2 text-muted">Song preferite:</h6>
            {preferite.length > 0 ? (
              <ReactTable
                data={preferite}
                columns={columns}
                defaultPageSize={10}
                filterable={false}
                className="-striped -highlight"
                SubComponent={expandedRowRender} // Aggiungi la funzione di rendering per le righe espandibili
              />
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AreaPersonale;
