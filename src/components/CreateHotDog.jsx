import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateHotDog = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(true);

  const navigate = useNavigate();

  const generateRandomId = () => {
    setId(Math.random().toString(36).substring(2, 15));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateRandomId();
    const hotDogData = { id, name, location, image, status };
    console.log(hotDogData);
    fetch("http://localhost:8000/data", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(hotDogData),
    })
      .then((res) => {
        console.log(res);
        alert("Listing Added!");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Create Listing</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <form onSubmit={handleSubmit}>
              <input
                type="hidden"
                className="form-control py-2 my-3"
                name="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <input
                type="text"
                className="form-control py-2 my-3"
                placeholder="Please Enter Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="form-control py-2 my-3"
                placeholder="Please Enter Location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                type="text"
                className="form-control py-2 my-3"
                placeholder="Please Enter Image URL"
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <button type="submit" className="btn btn-success me-2">
                Create
              </button>
              <Link to="/" className="btn btn-danger">
                Go Back
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateHotDog;
