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
            isLoading: false
          });
        }
      };
    
    
    render() {
        const { isLoading, similarUsers } = this.state;
        console.log(similarUsers)
        console.log(isLoading)
        if(!isLoading){
          return (
              <div>
                      <Container>
                          <div className="d-flex justify-content-between">
                          {similarUsers.map((user) => (
                          <Card key={user.user_id} style={{ width: '18rem' }}>
                              <Card.Body>
                                  <Card.Title>{user.Username}</Card.Title>
                              </Card.Body>
                          </Card>
                          ))}
                </div>
              </Container>
            
              </div>
          )
        }
    }
}

export default CommunityPage