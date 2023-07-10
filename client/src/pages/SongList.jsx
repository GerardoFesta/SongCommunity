import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'





class SongList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            song: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllSongs().then(song => {
            this.setState({
                song: song.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { song, isLoading } = this.state
        console.log('TCL: SongList -> render -> song', song)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Rating',
                accessor: 'rating',
                filterable: true,
            },
            {
                Header: 'Time',
                accessor: 'time',
                Cell: props => <span>{props.value.join(' / ')}</span>,
            },
        ]

        let showTable = true
        if (!song.length) {
            showTable = false
        }

        return (
            <div>
                {showTable && (
                    <ReactTable
                        data={song}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </div>
        )
    }
}

export default SongList