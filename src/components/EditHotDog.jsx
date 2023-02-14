import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditHotDog = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(true);

  const navigate = useNavigate();

  const { prodId } = useParams();

  //   useEffect(() => {
  //     fetch("http://localhost:8000/data/" + prodId)
  //       .then((res) => res.json())
  //       .then((result) => {
  //         setId(result.id);
  //         setName(result.name);
  //         setLocation(result.location);
  //         setImage(result.image);
  //         console.log(result);
  //       })
  //       .catch((err) => console.log(err.message));
  //   });
  useEffect(() => {
    fetch("http://localhost:8000/data/" + prodId)
      .then((res) => res.json())
      .then((result) => {
        setId(result.id);
        setName(result.name);
        setLocation(result.location);
        setImage(result.image);
        console.log(result);
      })
      .catch((err) => console.log(err.message));
  }, [prodId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const hotDogData = { id, name, location, image, status };
    console.log(hotDogData);
    fetch("http://localhost:8000/data/" + prodId, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(hotDogData),
    })
      .then((res) => {
        console.log(res);
        alert("Listing Updated!");
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
            <h1>Edit Listing</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <form>
              <input
                type="hidden"
                className="form-control py-2 my-3"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <input
                type="text"
                className="form-control py-2 my-3"
                placeholder="Please Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="form-control py-2 my-3"
                placeholder="Please Enter Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                type="text"
                className="form-control py-2 my-3"
                placeholder="Please Enter Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-success me-2"
              >
                Update
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

export default EditHotDog;
