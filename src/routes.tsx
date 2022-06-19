import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/pokedex' element={<Pokedex/>}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;