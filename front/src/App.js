import "./App.css";
import { Addmovie } from "./Addmovie";
import { Register } from "./Register";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { Portal } from "./Portal";
import Home from "./Home";
import { NotFound } from "./NotFound";
import Counter from "./Counter";
import Movielist from "./Movielist";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import MovieDetail from "./MovieDetail";
import EditMovie from "./EditMovie";



function App() {
  const [mode,setMode] = useState("light")
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <div>
       <ThemeProvider theme={darkTheme}>
        <paper style ={{ minHeight: "100vh", borderrRadius:"0%"}} elevation ={9}>
      <Routes>
       <Route path="/register" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
       
        <Route path="/portal" element={<Portal mode ={mode} setMode={setMode} />}>
       
          <Route path="home" element={<Home />} />
          <Route path="addmovie" element={<Addmovie />} />
          <Route path="movie" element={<Movielist />} />
          <Route path="view/:id" element={<MovieDetail />} />
          <Route path="edit/:id" element={<EditMovie />} />
               {/* <Route path="edit/:id" element={<EditMovie />}  */}

        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </paper>
      </ThemeProvider>
    </div>
  );
}


export default App;
