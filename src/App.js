
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import Home from './pages/Home';
import { lazy, Suspense } from 'react';
import Product from './pages/Product';
import CartItem from './pages/CartItem';
import Nav from './components/Nav';

function App() {
  const Home = lazy(() => import('./pages/Home'));
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Suspense fallback={<div>Loading...</div>}>
          <Home />
        </Suspense>} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/cartitem' element={<CartItem />} />

      </Routes>
    </div>

  );
}
export default App;
