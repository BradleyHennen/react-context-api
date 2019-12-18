import React, {Component} from 'react';
import Header from './Components/Header.component';
import LyricForm from './Components/LyricForm.component';
import History from './Components/History.component';
import {SharedSnackbarProvider} from './Context/SharedSnackbar.context';

class App extends Component {
    render() {
        return (
            <SharedSnackbarProvider>
                <Header/>
                <div>
                    <LyricForm/>
                    <History />
                </div>
            </SharedSnackbarProvider>
        );
    }
}

export default App;
