import React from 'react';
import axios from 'axios';

const ViewShop = (props) => {
    const [shopID, setShopID] = React.useState('');
    const [shopCategory, setShopCategory] = React.useState('');
    const [shopType, setShopType] = React.useState('');
    const [vacant, setVacant] = React.useState(true);
    const [bazar, setBazar] = React.useState('');
    const [size, setSize] = React.useState('');
    const [shopCategories, setShopCategories] = React.useState([]);
    const [shopTypes, setShopTypes] = React.useState([]);

    React.useEffect(() => {
        axios
            .get('http://localhost:8000/shopCategories')
            .then((response) => setShopCategories(response.data))
            .catch((error) => console.error(error));

        axios
            .get('http://localhost:8000/shopTypes')
            .then((response) => setShopTypes(response.data))
            .catch((error) => console.error(error));

        axios
            .get(`http://localhost:8000/shops/${props.match.params.id}`)
            .then((response) => {
                setShopID(response.data.shopID);
                setShopCategory(response.data.shopCategory);
                setShopType(response.data.shopType);
                setVacant(response.data.vacant);
                setBazar(response.data.bazar);
                setSize(response.data.size);
            })
            .catch((error) => console.error(error));
    }, [props.match.params.id]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 card card-body mt-5">
                    <h3>View Shop</h3>
                    <form>
                        <div className="form-group">
                            <label htmlFor="shopID">Shop ID</label>
                            <input
                                type="text"
                                id="shopID"
                                name="shopID"
                                className="form-control"
                                value={shopID}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="shopCategory">Shop Category</label>
                            <select
                                id="shopCategory"
                                name="shopCategory"
                                className="form-control"
                                value={shopCategory}
                                readOnly
                            >
                                {shopCategories.map((shopCategory) => (
                                    <option key={shopCategory._id} value={shopCategory._id}>
                                        {shopCategory.name} ({shopCategory.code})  
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="shopType">Shop Type</label>
                            <select
                                id="shopType"
                                name="shopType"
                                className="form-control"
                                value={shopType}
                                readOnly
                            >
                                {shopTypes.map((shopType) => (
                                    <option key={shopType._id} value={shopType._id}>
                                        {shopType.name} ({shopType.code})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="vacant">Vacant</label>
                            <input
                                type="checkbox"
                                id="vacant"
                                name="vacant"
                                className="form-control"
                                checked={vacant}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bazar">Bazar</label>
                            <input
                                type="text"
                                id="bazar"
                                name="bazar"
                                className="form-control"
                                value={bazar}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="size">Size</label>
                            <input
                                type="text"
                                id="size"
                                name="size"
                                className="form-control"
                                value={size}
                                readOnly
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ViewShop;