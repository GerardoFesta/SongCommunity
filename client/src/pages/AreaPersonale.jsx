import React, { Component } from 'react';
import api, { getUserById } from '../api';
import { useState, useEffect } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Table from 'react-bootstrap/Table';



class AreaPersonale extends Component {
  constructor(props) {
    super(props);
    const userId = localStorage.getItem('userId');
    // Inizializza lo stato con i dati dell'utente
    this.state = {
      username :'',
      email :'',
      preferite: [],
      // Aggiungi qui altri dati dell'utente
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
        arrayPreferite.push(canzone);
      }
      
      this.setState({
        username: username,
        email: email,
        preferite: arrayPreferite
      });
    }
  };
  
  

  render() {
    const { username, email, preferite } = this.state;
  
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
        filterable:true,
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
      // Aggiungi qui altre colonne desiderate
    ];

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
          filterable={true}
          className="-striped -highlight"
        />
      ) : (
        <p>Nessuna canzone preferita trovata.</p>
      )}
    </div>
  </div>
</div>
    );
  }
}

export default AreaPersonale;
