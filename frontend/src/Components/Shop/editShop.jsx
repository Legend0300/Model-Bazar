import React, { useState, useEffect } from "react";
import axios from "axios";

const EditShop = (props) => {
  const [shopID, setShopID] = useState("");
  const [shopCategory, setShopCategory] = useState("");
  const [shopType, setShopType] = useState("");
  const [vacant, setVacant] = useState(true);
  const [bazar, setBazar] = useState("");
  const [size, setSize] = useState("");
  const [shopCategories, setShopCategories] = useState([]);
  const [shopTypes, setShopTypes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/shopCategories")
      .then(response => setShopCategories(response.data))
      .catch(error => console.error(error));

    axios.get("http://localhost:8000/shopTypes")
      .then(response => setShopTypes(response.data))
      .catch(error => console.error(error));

    axios.get(`http://localhost:8000/shops/${props.match.params.id}`)
      .then(response => {
        setShopID(response.data.shopID);
        setShopCategory(response.data.shopCategory);
        setShopType(response.data.shopType);
        setVacant(response.data.vacant);
        setBazar(response.data.bazar);
        setSize(response.data.size);
      })
      .catch(error => console.error(error));
  }, [props.match.params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/shops/${props.match.params.id}`, {
      shopID,
      shopCategory,
      shopType,
      vacant,
      bazar,
      size
    })
    .then(response => {
      console.log(response.data);
      props.history.push("/shops");
    })
    .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 card card-body mt-5">
          <h3>Edit Shop</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="shopID">Shop ID</label>
              <input
                type="text"
                id="shopID"
                onChange={e => setShopID(e.target.value)}
                value={shopID}
                className="form-control"
                placeholder="Enter shop ID"
              />
            </div>
            <div className="form-group">
              <label htmlFor="shopCategory">Shop Category</label>
              <select
                id="shopCategory"
                onChange={e => setShopCategory(e.target.value)}
                value={shopCategory}
                className="form-control"
              >
                <option value="">Select Shop Category</option>
                {shopCategories.map(shopCategory => (
                  <option key={shopCategory} value={shopCategory}>
                    {shopCategory}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="shopType">Shop Type</label>
              <select
                id="shopType"
                onChange={e => setShopType(e.target.value)}
                value={shopType}
                className="form-control"
              >
                <option value="">Select Shop Type</option>
                {shopTypes.map(shopType => (
                  <option key={shopType} value={shopType}>
                    {shopType}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="vacant">Vacant</label>
              <select
                id="vacant"
                onChange={e => setVacant(e.target.value)}
                value={vacant}
                className="form-control"
              >
                <option value="">Select Vacant</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="bazar">Bazar</label>
              <input
                type="text"
                id="bazar"
                onChange={e => setBazar(e.target.value)}
                value={bazar}
                className="form-control"
                placeholder="Enter Bazar"
              />
            </div>
            <div className="form-group">
              <label htmlFor="size">Size</label>
              <input
                type="text"
                id="size"
                onChange={e => setSize(e.target.value)}
                value={size}
                className="form-control"
                placeholder="Enter Size"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Shop
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditShop;