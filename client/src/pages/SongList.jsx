import React, { Component } from 'react';
import ReactTable from 'react-table-6';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '../api';
import styled from 'styled-components';
import 'react-table-6/react-table.css';

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
      this.setState({
        songs: songs.data.data,
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
    }
  };

  render() {
    const { songs, isLoading, favorites } = this.state;

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
    ];

    let showTable = true;
    if (!songs.length) {
      showTable = false;
    }

    return (
      <Wrapper className="container mt-4">
        {showTable && (
          <div className="card">
            <div className="card-body">
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
