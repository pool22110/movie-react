import React, { useState,useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import styles from "./searchbar.module.css"

import axios from "axios";
// import Navbar from "../../componants/Navbar/navbar";
import { Link } from "react-router-dom";
import MovieCard from "../../landingpage/moviecard/moviecard";
import Navbar from "../Navbar/Menubar";

export default function DropdownBar() {
  const [selectedLanguage, setSelectedLanguage] = useState({});
  const [selectedGenre, setSelectedGenre] = useState({});
  const [selectedRating, setSelectedRating] = useState({});
  const namevalue=selectedGenre["name"]
  console.log(namevalue)
    const defaultvalue=""
  
    const genre = [
    { name: "",code:"ac"},
    { name: "Action",code:"ac"},
    { name: "Crime", code: "RM" },
    { name: "Comedy", code: "LDN" },
    { name: "Family", code: "IST" },
    { name: "Biography", code: "PRS" },
  ];
  const Language = [
    { name: "",code:"ac"},
    { name: "Hindi", code: "NY"},
    { name: "English", code: "RM" },
    { name: "Marathi", code: "LDN" },
    { name: "Tamil", code: "IST" },
    { name: "Kannad", code: "PRS" },
  ];
  const rating = [
    { name: "",code:"ac"},
    { name: "A", code: "NY" },
    { name: "U", code: "RM" },
    { name: "UA", code: "LDN" },
  ];
  // &language=${selectedLanguage}&rating=${selectedRating}
  const [movies,setmovies] = useState([]);
  console.log(movies)

  useEffect(()=>{
      axios.get(`http://127.0.0.1:8000/api/movies/?genre=${selectedGenre["name"]}&language=${selectedLanguage["name"]}&altrating=${selectedRating["name"]}`)
      .then((response)=>{
          console.log(response)
          setmovies(response.data)
      })
  },[selectedLanguage,selectedGenre,selectedRating])


  return (
    <>
    <Navbar/>
    <div className={styles.backgroundcontainer}>
              <div className={styles.tabb}>
                <span className="p-float-label">
                    <Dropdown
                    inputId="dd-genre"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.value)}
                    options={genre}
                    defaultValue={defaultvalue}
                    optionLabel="name"
                    // showClear
                    className={styles.boxx}

                    />
                    <label htmlFor="dd-genre">Select a Genre</label>
                </span>

                <span className="p-float-label">
                    <Dropdown
                    inputId="dd-lang"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.value)}
                    options={Language}
                    optionLabel="name"
                    className={styles.boxx}

                    />
                    <label htmlFor="dd-lang">Select a Language</label>
                </span>

                <span className="p-float-label">
                    <Dropdown
                    inputId="dd-alt-rate"
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.value)}
                    options={rating}
                    optionLabel="name"
                    // showClear
                    className={styles.boxx}

                    />
                    <label htmlFor="dd-rate">Select a Rating</label>
                </span>
            </div>
            <div className="row">
                    {
                        movies.map(m=>
                            <div key={m.id} className="accordion">
                               <Link to={`/movie/${m.id}`}>
                                    <MovieCard key={m.id} movie={m} />
                                </Link>
                            </div> )
                    }
                </div>

    </div>
    </>
  );
}                                                                                                                                                                                                       
