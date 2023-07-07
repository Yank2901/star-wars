import "./App.css";
import FindData from './Components/FindData';
import People from './Components/People'
//npm install react-router-dom
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FindData  />} />
          <Route path="/:id" element={<People />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;