import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {SharedSnackbarConsumer} from '../Context/SharedSnackbar.context';

const style = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    table: {
        minWidth: '100%'
    },
    spinner: {
        paddingTop: '25px'
    }

};

function History() {

    return <SharedSnackbarConsumer>
        {({loading, showHistory, history, fetchLyrics}) => (
            <div style={style.root}>
                {loading && showHistory &&
                <div style={style.spinner} className="lds-ring">
                    <div>{}</div>
                    <div>{}</div>
                    <div>{}</div>
                    <div>{}</div>
                </div>
                }
                {!loading && showHistory &&
                <React.Fragment>
                    <h1>History</h1>
                    <Table style={style.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Artist</TableCell>
                                <TableCell>Song</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {history.map((row, key) => (
                                <TableRow key={key} onClick={() => {
                                    fetchLyrics(row.artist, row.song, true)
                                }}>
                                    <TableCell component="th" scope="row">
                                        {key + 1}
                                    </TableCell>
                                    <TableCell>
                                        {row.artist}
                                    </TableCell>
                                    <TableCell>
                                        {row.song}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </React.Fragment>
                }
            </div>
        )}
    </SharedSnackbarConsumer>;
}

export default History;
