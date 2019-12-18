import React, {Component} from 'react';

const SharedSnackbarContext = React.createContext(1);

export class SharedSnackbarProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            loading: false,
            error: null,
            noLyrics: '',
            showHistory: false,
            showHome: false,
            history: [],
            currentArtist: '',
            currentSong: ''
        };
    }

    fetchLyrics = async (bandName, songName, fromHistory = false) => {
        this.setState({loading: true});

        try {
            const response = await fetch(`https://api.lyrics.ovh/v1/${bandName}/${songName}`);
            const data = await response.json();
            console.warn('response', data);
            console.warn('No lyrics', data.error);

            if (data.error) {
                this.setState({
                    loading: false,
                    noLyrics: data.error,
                    data: null
                });

            }
            else if(fromHistory) {
                this.setState({
                    loading: false,
                    noLyrics: '',
                    data: data,
                    showHome: true,
                    showHistory: false,
                    currentArtist: bandName,
                    currentSong: songName
                })
            }
            else {
                this.setState({
                    loading: false,
                    noLyrics: '',
                    data: data,
                    currentArtist: bandName,
                    currentSong: songName,
                    history: [
                        ...this.state.history,
                        {
                            artist: bandName,
                            song: songName
                        }
                    ]
                })
            }
        } catch (error) {
            this.setState({error, loading: false});
            console.warn('Error', error)
        }
    };

    onClickNav = (route) => {
        switch (route) {
            case 'History':
                return this.setState({
                    showHistory: true,
                    showHome: false
                });
            case 'Home':
                return this.setState({
                    showHome: true,
                    showHistory: false
                });
            default:
                return null;
        }
    };

    render() {
        const {children} = this.props;

        return (
            <SharedSnackbarContext.Provider
                value={{
                    data: this.state.data,
                    loading: this.state.loading,
                    error: this.state.error,
                    fetchLyrics: this.fetchLyrics,
                    noLyrics: this.state.noLyrics,
                    showHistory: this.state.showHistory,
                    onClickNav: this.onClickNav,
                    history: this.state.history,
                    currentArtist: this.state.currentArtist,
                    currentSong: this.state.currentSong
                }}
            >
                {children}
            </SharedSnackbarContext.Provider>
        );
    }
}

export const SharedSnackbarConsumer = SharedSnackbarContext.Consumer;