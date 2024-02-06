// import viteLogo from '/vite.svg'
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout.tsx';
import Elements from './features/element/Elements.tsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={ <Elements /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
