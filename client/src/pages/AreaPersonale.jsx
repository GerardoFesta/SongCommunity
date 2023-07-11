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
      <div>
        <h1>Area Personale</h1>
        <p>Benvenuto, {username} !</p>
        <p>Email: {email}</p>
        <p>Song preferite:</p>
        {preferite.length > 0 ? (
          <Table striped bordered hover>
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column.Header}>{column.Header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {preferite.map((canzone, index) => (
              <tr key={index}>
                {columns.map(column => (
                  <td key={column.accessor}>
                    {column.Cell ? column.Cell({ value: canzone[column.accessor] }) : canzone[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        ) : (
          <p>Nessuna canzone preferita trovata.</p>
        )}
        {/* Aggiungi qui altri componenti o informazioni dell'utente */}
      </div>
    );
  }
}

export default AreaPersonale;
