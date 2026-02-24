import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Suspense} from 'react';

import Spinner from "./components/Spinner/Spinner";
import Page404 from "./components/pages/404";
import {MainPage, ContactMe} from './components/pages/index'


function App () {

    return (
        <Router basename="/weather-app-portfolio">
            <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path='/' element={<MainPage/>}/>
                            <Route path='/contact-me' element={<ContactMe/>}/>
                            <Route path='*' element={<Page404/>}/>
                        </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
