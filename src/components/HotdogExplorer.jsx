import HotdogListing from "./HotdogListing";
import "./HotdogExplorer.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Hero from "../common/HeroSection";
import heroImage from "../images/heroImage.png";

const HotdogExplorer = () => {
  const myRef = useRef(document.getElementById("hero-container"));

  const handleScroll = () => {
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [hotdogListings, setHotdogListings] = useState([]);

  const getData = () => {
    fetch("http://localhost:8000/data")
      .then(function (response) {
        console.log(response);
        return response.text();
      })
      .then(function (myJson) {
        const result = JSON.parse(myJson);
        setHotdogListings(result);
        console.log("result: ", result);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const { prodId } = useParams();
  const onDeleteFunction = (id) => {
    if (window.confirm("Do you want to delete this item?")) {
      fetch("http://localhost:8000/data/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          console.log(res);
          alert("Listing Deleted!");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <>
      <Hero image={heroImage} handleScroll={handleScroll} ref={myRef} />
      <div className="container explorer">
        <div className="row align-items-center">
          <div className="col-6 explorer--title py-3">
            <p>Explore Listing</p>
          </div>
          <div className="col-6 py-3 text-end">
            <Link to="/create" className="btn btn-primary">
              Create New Listing
            </Link>
          </div>
        </div>
        <div className="row mt-4" id="hero-container" style={{ rowGap: 45 }}>
          {hotdogListings
            .filter((fil) => fil.status === true)
            .map((hotdog) => (
              <div key={hotdog.id} className="col-md-3">
                <div className="card">
                  <img
                    className="card-img-top"
                    src={hotdog.image}
                    alt={hotdog.name}
                  />
                  <div className="card-body">
                    <div className="card--header">
                      <h5 className="card-title">{hotdog.name}</h5>

                      <div>
                        <span className="location">Location: </span>
                        <span className="card-text">{hotdog.location}</span>
                      </div>
                    </div>
                    <div className="rating"></div>
                  </div>
                  <div className="card-footer">
                    <Link
                      to={`/edit/${hotdog.id}`}
                      className="btn btn-sm btn-outline-info mb-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => onDeleteFunction(hotdog.id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default HotdogExplorer;
