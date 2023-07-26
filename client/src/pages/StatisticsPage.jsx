import React, { Component } from 'react';
import ReactTable from 'react-table-6';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '../api';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import styled from 'styled-components';
import 'react-table-6/react-table.css';
import { connect } from 'react-redux';




class StatisticsPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
        favorites: [],
        artists: {},
        genres: {},
      };
    }
  
    componentDidMount = async () => {
      Chart.register(CategoryScale, LinearScale, BarElement);
      this.setState({ isLoading: true });
  
      const {userId} = this.props;
      let favorites = [];
      if (userId != null) {
        const userResponse = await api.getUserById(userId);
  
        const user = userResponse.data.data;
  
        favorites = user.Preferite || [];
      }
      this.setState({ favorites: favorites });
      let fav_artists = await api.getFavArtists(userId);
      let fav_genres = await api.getFavGenres(userId);
      fav_artists = fav_artists.data.artisti_preferiti;
      fav_genres = fav_genres.data.generi_preferiti;
      console.log({ fav_artists });
      console.log({ fav_genres });
      const artists_dict = {};
      const genres_dict = {};
      fav_artists.forEach((entry) => {
        artists_dict[entry._id] = entry.frequency;
      });
      fav_genres.forEach((entry) => {
        genres_dict[entry._id] = entry.frequency;
      });
  
      this.setState({ artists: artists_dict, genres: genres_dict, isLoading: false });
    };
  
    render() {
      const { artists, genres } = this.state;
  
      const artistLabels = Object.keys(artists);
      const artistFrequencies = Object.values(artists);
  
      const genreLabels = Object.keys(genres);
      const genreFrequencies = Object.values(genres);
  
      const artistChartData = {
        labels: artistLabels,
        datasets: [
          {
            label: 'Frequenza Artisti',
            data: artistFrequencies,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
  
      const genreChartData = {
        labels: genreLabels,
        datasets: [
          {
            label: 'Frequenza Generi',
            data: genreFrequencies,
            backgroundColor: 'rgba(192, 75, 192, 0.6)',
            borderColor: 'rgba(192, 75, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
  
      const chartOptions = {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      };
  
      return (
        <Container>
          <div style={{ width: '50%', display: 'inline-block' }}>
            <h1>Statistiche degli Artisti</h1>
            <Bar data={artistChartData} options={chartOptions} />
          </div>
          <div style={{ width: '50%', display: 'inline-block' }}>
            <h1>Statistiche dei Generi</h1>
            <Bar data={genreChartData} options={chartOptions} />
          </div>
        </Container>
      );
      
    }
  }
  const mapStateToProps = (state) => ({
    isAuthenticated: !!state.user,
    userId: state.user?.userId || null,
    username: state.user?.username || null,
    admin: state.user?.admin || null, // Se lo stato contiene l'utente, allora l'utente è autenticato
  });
  
  export default connect(mapStateToProps)(StatisticsPage);

  