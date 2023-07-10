import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'

import styled from 'styled-components'

import 'react-table-6/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`






class SongList extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            songs: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllSongs().then(songs => {
            this.setState({
                songs: songs.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { songs, isLoading } = this.state
        console.log('TCL: SongsList -> render -> movies', songs)
        songs.forEach(song => song.artists = song.artists.join(", "))
        const columns = [
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
          
        ]

        let showTable = true
        if (!songs.length) {
            showTable = false
        }

        return (
  
            
            
            <Wrapper>
                { showTable && (
                    <ReactTable
                        data={songs}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={25}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default SongList