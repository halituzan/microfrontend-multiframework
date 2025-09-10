import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Layout from "./Layout";
import NotFound from "./components/NotFound";

const ReactApp = lazy(() => import("reactApp/App"));
const VueWrapper = lazy(() => import("./wrappers/VueWrapper"));
const AngularWrapper = lazy(() => import("./wrappers/AngularWrapper"));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/react/*' element={<ReactApp />} />
          <Route path='/vue' element={<VueWrapper />} />
          <Route path='/angular' element={<AngularWrapper />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
