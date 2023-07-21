import React, { Component } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class SongDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
        song: null,
        isLoading: true,
        isEditMode: false,
        editedSong: null,
      };
  }

  componentDidMount = async () => {
    const { id } = this.props.params;
    const songId = id

    // Richiedi i dettagli della canzone al backend utilizzando l'ID
    try {
      const response = await api.getSongById(songId);
      const song = response.data.data;
      this.setState({ song: song, isLoading: false });
    } catch (error) {
      console.log('Error fetching song details:', error);
      this.setState({ isLoading: false });
    }
  };


  handleEditButtonClick = () => {
    this.setState({
      isEditMode: true,
      editedSong: { ...this.state.song }, //copia song
    });
  };

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
    const { song_id, ...updatedSongData } = editedSong; // Escludi song_id, poiché non deve essere modificato

    try {
      await api.updateSongById(song_id, updatedSongData);
      this.setState({
        song: editedSong, // Aggiorna lo state con le nuove informazioni della canzone
        isEditMode: false, // Esci dalla modalità di modifica
      });
    } catch (error) {
      console.log('Error updating song:', error);
    }
  };

  render() {
    const { song, isLoading, isEditMode, editedSong } = this.state;
    const isAdmin = localStorage.getItem("admin") != null
    
    if (isLoading) {
      return <div>Loading...</div>; 
    }

    // Mostra i dettagli della canzone quando sono disponibili
    return (
        <div>
          {song ? (
            <div>
              {isAdmin && isEditMode ? (
                <div>
                <Form>
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
          
                  <Button variant="primary" onClick={this.handleSaveButtonClick}>
                    Salva
                  </Button>
                </Form>
              </div>
              ) : (
                <div>
                  {/* Visualizzazione delle informazioni della canzone */}
                  <h1>{song.track_name}</h1>
                  <p>Artisti: {song.artists.join(', ')}</p>
                  <p>Generi: {song.track_genre.join(', ')}</p>
                  <p>Album Name: {song.album_name}</p>
                  <p>Popolarità: {song.popularity}</p>
                  <p>Durata: {song.duration_ms} ms</p>
                  <p>Explicit: {song.explicit ? 'Sì' : 'No'}</p>
                  <p>Danceability: {song.danceability}</p>
                  <p>Energy: {song.energy}</p>
                  <p>key: {song.key}</p>
                  <p>loudness: {song.loudness}</p>
                  <p>mode: {song.mode}</p>
                  <p>speechiness: {song.speechiness}</p>
                  <p>acousticness: {song.acousticness}</p>
                  <p>instrumentalness: {song.instrumentalness}</p>
                  <p>liveness: {song.liveness}</p>
                  <p>valence: {song.valence}</p>
                  <p>tempo: {song.tempo}</p>
                  <p>time_signature: {song.time_signature}</p>
                  
                  {isAdmin && (
                    <button onClick={this.handleEditButtonClick}>Modifica</button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>Canzone non trovata</div>
          )}
        </div>
    );
  
      
  }
}

export default withParams(SongDetails);
