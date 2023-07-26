import React, { Component } from 'react';
import ReactTable from 'react-table-6';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { faSpotify} from '@fortawesome/free-brands-svg-icons'
import api from '../api';
import styled from 'styled-components';
import 'react-table-6/react-table.css';
import {Alert, Spinner} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';


const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      columns: [],
      isLoading: false,
      favorites: [],
      showAlertEliminata: false,
      showAlertPreferita: false,
      addSongMode:false,
      editedSong: null,
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const { userId } = this.props;
    //const userId = localStorage.getItem('userId');
    let favorites = []
    if(userId!=null){
        const userResponse = await api.getUserById(userId);
        
        const user = userResponse.data.data;
    
        favorites = user.Preferite || [];
    }
    console.log(favorites)
    
  
    await api.getAllSongs().then((songs) => {
      songs = songs.data.data
      songs.forEach(song => {
        song.artists = song.artists.join(", ")
        song.track_genre = song.track_genre.join(", ")
      })
      this.setState({
        songs: songs,
        isLoading: false,
        favorites: favorites,
      });
    });
  };

  toggleFavorite = async (songId) => {
    const { favorites } = this.state;
    const { userId } = this.props;
    if (favorites.includes(songId)) {
      const updatedFavorites = favorites.filter((id) => id !== songId);
      await api.setUserFavorites(userId, updatedFavorites);
      this.setState({ favorites: updatedFavorites });
    } else {
      const updatedFavorites = [...favorites, songId];
      await api.setUserFavorites(userId, updatedFavorites);
      this.setState({ favorites: updatedFavorites });
      this.setState({ showAlertPreferita: true });
    }
  };

  deleteSong = async (songId) =>{
    //This also deletes the song by all the preferred songs lists
    await api.deleteSongById(songId)
    await api.getAllSongs().then((songs) => {
      songs = songs.data.data
      songs.forEach(song => {
        song.artists = song.artists.join(", ")
        song.track_genre = song.track_genre.join(", ")
      })
      this.setState({
        songs: songs,
        isLoading: false,
        showAlertEliminata: true,
      })
    })
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = ['artists', 'track_genre'].includes(name)
    ? value.split(',').map(item => item.trim())
    : value;
    this.setState((prevState) => ({
      editedSong: {
        ...prevState.editedSong,
        [name]: updatedValue,
      },
    }));
  };

  handleSaveButtonClick = async () => {

    const { editedSong } = this.state;
    const { ...updatedSongData } = editedSong; 
    try {
      await api.insertSong(updatedSongData);
      this.setState({
        addSongMode: false, // Esci dalla modalità di modifica
      });
    } catch (error) {
      console.log('Error updating song:', error);
    }
  };




  render() {
    const { songs, isLoading, favorites, showAlertEliminata, showAlertPreferita, addSongMode, editedSong } = this.state;
    const { userId, admin } = this.props;

    const columns = [
      {
        Header: 'Song N.',
        accessor: 'song_id',
        filterable: true,
      },
      {
        Header: 'Spotify',
        accessor: 'spotify_uri',
        filterable: false,
        Cell: ({ original }) => (
          <Link to={`https://open.spotify.com/track/${original.spotify_uri}` } target="_blank">
            <FontAwesomeIcon icon={faSpotify} style={{color: "#2ba522", height:30}} />  
          </Link>
        ),
      },
      {
        Header: 'Track Name',
        accessor: 'track_name',
        filterable: true,
        filterMethod: (filter, row) => {
          const id = row[filter.id];
          return id.toLowerCase().includes(filter.value.toLowerCase());
        },
        Cell: ({ original }) => (
          
          <Link to={`/songs/${original.song_id}`}>{original.track_name}</Link>
        ),
      },
      {
        Header: 'Genres',
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
        Header: 'Favorite',
        Cell: ({ original }) => ( 
          <FontAwesomeIcon
            icon={faHeart}
            color={favorites.includes(original.song_id) ? 'red' : 'lightgray'}
            onClick={() => this.toggleFavorite(original.song_id)}
            style={{ cursor: 'pointer', height:30}  }
          />
        ),
      },
      {
        Header: 'Delete Song',
        Cell: ({ original }) => ( 
          <FontAwesomeIcon
            icon={faTrashAlt}
            onClick={() => this.deleteSong(original.song_id)}
            style={{ cursor: 'pointer' }}
          />
        ),
      },
    ];

    let showTable = true;
    if (!songs.length) {
      showTable = false;
    }
    //This shows the right columns only if you are logged/admin
    if(userId==null){
      columns.pop()
      columns.pop()
    }else{
      if(admin==null)
        columns.pop()
    }




    
    if(!addSongMode){
      return (
        <Wrapper className="container mt-4">
          {!showTable && (
            <div className="text-center">
              <Spinner animation="border" role="status">
              </Spinner>
            </div>
          )}

          {showTable && (

            <div className="card">
              <div className="card-body">
                  {/* Alert di eliminazione completata */}
                  {showAlertEliminata && (
                    <Alert variant="success" onClose={() => this.setState({ showAlertEliminata: false })} dismissible>
                      Eliminazione Completata
                    </Alert>
                  )}
                  {/* Alert di aggiunta preferiti */}
                  {showAlertPreferita && (
                    <Alert variant="success" onClose={() => this.setState({ showAlertEliminata: false })} dismissible>
                      Canzone aggiunta ai preferiti
                    </Alert>
                  )}
                <ReactTable
                  data={songs}
                  columns={columns}
                  loading={isLoading}
                  defaultPageSize={25}
                  showPageSizeOptions={true}
                  minRows={0}
                  className="-striped -highlight"
                />
              </div>
            </div>
          )}
          {showTable && admin &&(
            <Button variant="primary" className="btn btn-dark" onClick={() => this.setState({
              addSongMode:true,
              editedSong: {
                spotify_uri:"",
                acousticness: 0,
                album_name: "",
                artists: [],
                danceability: 0,
                duration_ms: 0,
                energy: 0,
                explicit: false,
                instrumentalness: 0,
                key: 0,
                liveness: 0,
                loudness: 0,
                mode: 0,
                popularity: 0,
                song_id: 0,
                speechiness: 0,
                spotify_uri: "",
                tempo: 0,
                time_signature: 0,
                track_genre: [],
                track_name: "",
                valence: 0,}
              })}>
              Aggiungi Canzone
            </Button>
          )}
         </Wrapper>
      );
    }else{ //AGGIUNGI CANZONE
      return(
        <Container>
          <Form>
          <Form.Group controlId="spotify_uri">
              <Form.Label>Spotify URI</Form.Label>
              <Form.Control
                type="text"
                name="spotify_uri"
                value={editedSong.spotify_uri}
                onChange={this.handleInputChange}
              />
            </Form.Group>
          <Form.Group controlId="track_name">
              <Form.Label>Track Name</Form.Label>
              <Form.Control
                type="text"
                name="track_name"
                value={editedSong.track_name}
                onChange={this.handleInputChange}
              />
            </Form.Group>
    
            <Form.Group controlId="artists">
              <Form.Label>Artists</Form.Label>
              <Form.Control
                type="text"
                name="artists"
                value={Array.isArray(editedSong.artists) ? editedSong.artists.join(', ') : editedSong.artists}
                onChange={this.handleInputChange}
              />
            </Form.Group>
    
            <Form.Group controlId="track_genre">
              <Form.Label>Track Genre</Form.Label>
              <Form.Control
                type="text"
                name="track_genre"
                value={Array.isArray(editedSong.track_genre) ? editedSong.track_genre.join(', ') : editedSong.track_genre}
                onChange={this.handleInputChange}
              />
            </Form.Group>
    
            <Form.Group controlId="album_name">
              <Form.Label>Album Name</Form.Label>
              <Form.Control
                type="text"
                name="album_name"
                value={editedSong.album_name}
                onChange={this.handleInputChange}
              />
            </Form.Group>
    
            <Form.Group controlId="popularity">
              <Form.Label>Popularity</Form.Label>
              <Form.Control
                type="number"
                name="popularity"
                value={editedSong.popularity}
                onChange={this.handleInputChange}
              />
            </Form.Group>
    
            <Form.Group controlId="duration_ms">
              <Form.Label>Duration (ms)</Form.Label>
              <Form.Control
                type="number"
                name="duration_ms"
                value={editedSong.duration_ms}
                onChange={this.handleInputChange}
              />
            </Form.Group>
    
            <Form.Group controlId="danceability">
              <Form.Label>Danceability</Form.Label>
              <Form.Control
                type="number"
                name="danceability"
                value={editedSong.danceability}
                onChange={this.handleInputChange}
              />
            </Form.Group>
    
            <Form.Group controlId="energy">
              <Form.Label>Energy</Form.Label>
              <Form.Control
                type="number"
                name="energy"
                value={editedSong.energy}
                onChange={this.handleInputChange}
              />
            </Form.Group>
    
            <Form.Group controlId="key">
              <Form.Label>Key</Form.Label>
              <Form.Control
                type="number"
                name="key"
                value={editedSong.key}
                onChange={this.handleInputChange}
              />
            </Form.Group>
    
            <Form.Group controlId="loudness">
              <Form.Label>Loudness</Form.Label>
              <Form.Control
                type="number"
                name="loudness"
                value={editedSong.loudness}
                onChange={this.handleInputChange}
              />
            </Form.Group>
    
            <Form.Group controlId="mode">
              <Form.Label>Mode</Form.Label>
              <Form.Control
                type="number"
                name="mode"
                value={editedSong.mode}
                onChange={this.handleInputChange}
              />
            </Form.Group>
    
            <Form.Group controlId="speechiness">
              <Form.Label>Speechiness</Form.Label>
              <Form.Control
                type="number"
                name="speechiness"
                value={editedSong.speechiness}
                onChange={this.handleInputChange}
              />
            </Form.Group>
    
            <Form.Group controlId="acousticness">
              <Form.Label>Acousticness</Form.Label>
              <Form.Control
                type="number"
                name="acousticness"
                value={editedSong.acousticness}
                onChange={this.handleInputChange}
              />
            </Form.Group>
    
            <Form.Group controlId="instrumentalness">
              <Form.Label>Instrumentalness</Form.Label>
              <Form.Control
                type="number"
                name="instrumentalness"
                value={editedSong.instrumentalness}
                onChange={this.handleInputChange}
              />
            </Form.Group>
    
            <Form.Group controlId="liveness">
              <Form.Label>Liveness</Form.Label>
              <Form.Control
                type="number"
                name="liveness"
                value={editedSong.liveness}
                onChange={this.handleInputChange}
              />
            </Form.Group>
    
            <Form.Group controlId="valence">
              <Form.Label>Valence</Form.Label>
              <Form.Control
                type="number"
                name="valence"
                value={editedSong.valence}
                onChange={this.handleInputChange}
              />
            </Form.Group>
    
            <Form.Group controlId="tempo">
              <Form.Label>Tempo</Form.Label>
              <Form.Control
                type="number"
                name="tempo"
                value={editedSong.tempo}
                onChange={this.handleInputChange}
              />
            </Form.Group>
    
            <Form.Group controlId="time_signature">
              <Form.Label>Time Signature</Form.Label>
              <Form.Control
                type="number"
                name="time_signature"
                value={editedSong.time_signature}
                onChange={this.handleInputChange}
              />
            </Form.Group>
    
            <Button variant="primary" className="btn btn-dark" onClick={this.handleSaveButtonClick}>
              Salva
            </Button>
          </Form>
        </Container>
      )

    }
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: !!state.user,
  userId: state.user?.userId || null,
  username: state.user?.username || null,
  admin: state.user?.admin || null, // Se lo stato contiene l'utente, allora l'utente è autenticato
});
export default connect(mapStateToProps)(SongList);
