import React, {useState} from 'react';
import {TextField, Button} from '@material-ui/core';
import {SharedSnackbarConsumer} from '../Context/SharedSnackbar.context';

const style = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textField: {
        margin: '5%'
    },
    button: {
        margin: '10%'
    },
    lyrics: {
        margin: '5%',
        whiteSpace: 'pre-wrap',
    },
    margin: {
        margin: 0
    }

};

function LyricForm() {
    const [bandName, setBandName] = useState('');
    const [songName, setSongName] = useState('');
    const [validate, setValidate] = useState('');

    function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    function validateFields(func) {
        const titleCaseArtist = toTitleCase(bandName);
        const titleCaseSong = toTitleCase(songName);
        if (bandName !== '' && songName !== '') {
            setValidate('');
            setBandName('');
            setSongName('');
            func(titleCaseArtist, titleCaseSong);
        } else {
            setValidate('Please Fill Out Both Fields')
        }
    }

    function renderLyrics(data, currentArtist, currentSong) {

        return (
            <div style={style.lyrics}>
                <h4>Artist: {currentArtist}</h4>
                <h4>Song: {currentSong}</h4>
                <p style={style.lyrics}>{data.lyrics}</p>
            </div>
        )
    }

    return <SharedSnackbarConsumer>
        {({data, loading, fetchLyrics, noLyrics, showHistory, currentArtist, currentSong}) => (
            <React.Fragment>
                {!showHistory && <div style={style.root}>
                    <h1>Search For Lyrics</h1>
                    {(validate !== '') && <p style={{color: 'red'}}>{validate}</p>}
                    <form style={style.root}>
                        <TextField id={'bandName'}
                                   label={`Artist Name`}
                                   style={style.textField}
                                   onChange={(event) => setBandName(event.target.value)}/>
                        <TextField id={'songTitle'}
                                   label={'Song Title'}
                                   style={style.textField}
                                   onChange={(event) => setSongName(event.target.value)}/>
                        <Button style={style.button} variant={'contained'}
                                onClick={() => validateFields(fetchLyrics)}>
                            Search
                        </Button>
                    </form>
                    {loading &&
                    <div className="lds-ring">
                        <div>{}</div>
                        <div>{}</div>
                        <div>{}</div>
                        <div>{}</div>
                    </div>
                    }
                    {!loading && data && (data.lyrics !== '') && renderLyrics(data, currentArtist, currentSong)}
                    {!loading && (noLyrics !== '') && <p><strong>{noLyrics}</strong></p>}
                </div>
                }
            </React.Fragment>
        )}
    </SharedSnackbarConsumer>;
}

export default LyricForm;
