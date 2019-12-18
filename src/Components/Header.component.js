import React from 'react';
import {SharedSnackbarConsumer} from '../Context/SharedSnackbar.context';

const style = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'teal',
    },
    nav: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderTop: '1px solid black',
        fontWeight: 'bold'
    },
    h2: {
        marginTop: 0,
    }
};

const Header = () => (
    <SharedSnackbarConsumer>
        {({onClickNav}) => (
            <div style={style.root}>
                <div style={style.root}>
                    <h1>React Context API</h1>
                    <h2 style={style.h2}>Lyric Finder</h2>
                </div>
                <div style={style.nav}>
                    <p onClick={() => onClickNav('Home')}>Home</p>
                    <p onClick={() => onClickNav('History')}>Search History</p>
                </div>
            </div>
        )}
    </SharedSnackbarConsumer>
);

export default Header;