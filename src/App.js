import './App.css';
import styles from './style';
import Dashboard from './components/MainHome';
import { Route, Router, Routes } from 'react-router-dom';
import DestinationPage from './pages/Destinations/destination';
import Success from './pages/Success/Success';
import Modern from './pages/Modern/Modern';
import SingleDest from './pages/singleDest/SingleDest';
import MainHome from './components/MainHome';
import TestAPI from './pages/test';
import MainForm from './components/Forms/MainForm';
import BookingPage from './pages/singleDest/BookingPage';
import PropertyAvailable from './pages/singleDest/PropertyAvailable';
import PropertyRates from './pages/Quote/PropertyRates';

function App() {
  return (
  <Routes>
    <Route path='/' element={<MainHome />} />
    <Route path='/dest' element={<DestinationPage />} />
    <Route path='/success' element={<Success />} />
    <Route path='/modern' element={<Modern />} />
    <Route path='/single/:id' element={<SingleDest />} />
    <Route path='/test' element={<TestAPI />} />
    <Route path='/getQuote' element={<BookingPage />} />
    <Route path='/available' element={<PropertyAvailable />} />
    <Route path='/rates' element={<PropertyRates />} />
  </Routes>
  );
}

export default App;
