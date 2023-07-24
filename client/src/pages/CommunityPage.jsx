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
import '../style/style.css';

class CommunityPage extends Component {
    constructor(props) {
        super(props);
        const userId = localStorage.getItem('userId');
        // Inizializza lo stato con i dati dell'utente
        this.state = {
          preferite: [],
          similarUsers: {},
          isLoading: true,
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

          const similarUsersResponse = await api.getSimilarUsers(userId)
          
          const similarUsers = similarUsersResponse.data.data

          for(const user of similarUsers){
            const arrayPreferite = [];
            for (const songId of user.Preferite){
              const canzoneResponse = await api.getSongById(songId);

              const canzone = canzoneResponse.data.data;
              canzone.artists = canzone.artists.join(', ');
              canzone.track_genre = canzone.track_genre.join(', ');
              arrayPreferite.push(canzone)
            }
            user["CanzoniPreferite"] = arrayPreferite
          }

          
            
            /*
            user.CanzoniPreferite = arrayPreferite
            user.Preferite.forEach(canzone => async() => {
              const canzoneResponse = await api.getSongById(canzone.songId);
              const canzone = canzoneResponse.data.data;
              canzone.artists = canzone.artists.join(', ');
              canzone.track_genre = canzone.track_genre.join(', ');
              arrayPreferite.push(canzone)
            })
            user.CanzoniPreferite = arrayPreferite
          })*/

          this.setState({
            username: username,
            email: email,
            preferite: arrayPreferite,
            similarUsers: similarUsers,
            isLoading: false,
            preferiteIds: preferite
          });
        }

        
      };
      toggleFavorite = async (songId) => {
        const { preferiteIds } = this.state;
        if (preferiteIds.includes(songId)) {
          const updatedFavorites = preferiteIds.filter((id) => id !== songId);
          await api.setUserFavorites(localStorage.getItem('userId'), updatedFavorites);
          this.setState({ preferiteIds: updatedFavorites });
        } else {
          const updatedFavorites = [...preferiteIds, songId];
          await api.setUserFavorites(localStorage.getItem('userId'), updatedFavorites);
          this.setState({ preferiteIds: updatedFavorites });
        }
      };
    render() {
        const { isLoading, similarUsers, preferiteIds } = this.state;
        console.log(similarUsers)
        console.log(isLoading)
        if(!isLoading){
          
          return (
              
                <Container>
                  
                    {similarUsers.map((user) => (
                      <div className='song-container'><div className='special-text'> {user.Username}</div>
                      <p>Canzoni in comune: {user.commonCount}</p>
                      <p>Canzoni preferite:</p>
                      {user.CanzoniPreferite.map((song) => (
                        <div className='song' >
                          
                          <p>{song.track_name}</p>
                          <p>{song.artists}</p>
                          <FontAwesomeIcon
                                  icon={faHeart}
                                  color={preferiteIds.includes(song.song_id) ? 'red' : 'lightgrey'}
                                  onClick={() => this.toggleFavorite(song.song_id)}
                                  style={{ cursor: 'pointer' }}
                                />

                        </div>
                        ))}
                      </div>
                    ))}
                  
                </Container>
            
              
          )
        }
    }
}

export default CommunityPage