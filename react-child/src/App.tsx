import { Routes, Route } from "react-router-dom";
import "./App.css";
import DetailPage from "./components/DetailPage";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/detail' element={<DetailPage />} />
      <Route path='/not-found' element={<NotFound />} />
    </Routes>
  );
};

export default App;
