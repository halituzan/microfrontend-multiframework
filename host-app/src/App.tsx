import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Layout from "./Layout";

const ReactWrapper = lazy(() => import("./wrappers/ReactWrapper"));
const VueWrapper = lazy(() => import("./wrappers/VueWrapper"));
const AngularWrapper = lazy(() => import("./wrappers/AngularWrapper"));

const App: React.FC = () => {
  // const [reactWrapper, setReactWrapper] = useState<boolean | null>(null)
  // const [vueWrapper, setVueWrapper] = useState<boolean | null>(null)
  // const [angularWrapper, setAngularWrapper] = useState<boolean | null>(null)
  // const checkReactWrapper = async () => {
  //   const res = await import("reactApp/App")
  //   setReactWrapper(typeof res.default === 'function' ? true : false)
  // }
  // const checkVueWrapper = async () => {
  //   const res = await import("vueApp/App")
  //   setVueWrapper(typeof res.mount === 'function' ? true : false)
  // }
  // const checkAngularWrapper = async () => {
  //   const res = await import("angularApp/App")
  //   setAngularWrapper(typeof res.bootstrap === 'function' ? true : false)
  // }
  // useEffect(() => {
  //   checkReactWrapper()
  //   checkVueWrapper()
  //   checkAngularWrapper()
  // }, [])

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/react/*' element={<ReactWrapper />} />
          <Route path='/vue' element={<VueWrapper />} />
          <Route path='/angular' element={<AngularWrapper />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
