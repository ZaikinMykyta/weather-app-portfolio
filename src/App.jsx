import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Suspense} from 'react';

import Spinner from "./components/Spinner/Spinner";
import {MainPage, ContactMe} from './components/pages/index'


function App () {

    return (
        <Router>
            <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path='/' element={<MainPage/>}/>
                            <Route path='/contact-me' element={<ContactMe/>}/>
                        </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
