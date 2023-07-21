import React, { Component } from 'react';
import ReactTable from 'react-table-6';
import { faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '../api';
import styled from 'styled-components';
import 'react-table-6/react-table.css';
import {Alert, Spinner} from 'react-bootstrap'
import { Link } from 'react-router-dom';

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
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
  
    const userId = localStorage.getItem('userId');
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
  
    if (favorites.includes(songId)) {
      const updatedFavorites = favorites.filter((id) => id !== songId);
      await api.setUserFavorites(localStorage.getItem('userId'), updatedFavorites);
      this.setState({ favorites: updatedFavorites });
    } else {
      const updatedFavorites = [...favorites, songId];
      await api.setUserFavorites(localStorage.getItem('userId'), updatedFavorites);
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

  render() {
    const { songs, isLoading, favorites, showAlertEliminata, showAlertPreferita } = this.state;

    const columns = [
      {
        Header: 'Song N.',
        accessor: 'song_id',
        filterable: true,
      },
      {
        Header: 'ID',
        accessor: '_id',
        filterable: true,
        filterMethod: (filter, row) => {
          const id = row[filter.id];
          return id.toLowerCase().includes(filter.value.toLowerCase());
        },
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
            style={{ cursor: 'pointer' }}
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
    if(localStorage.getItem('userId')==null){
      columns.pop()
      columns.pop()
    }else{
      if(localStorage.getItem("admin")==null)
        columns.pop()
    }

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
   </Wrapper>
  );
  }
}

export default SongList;
