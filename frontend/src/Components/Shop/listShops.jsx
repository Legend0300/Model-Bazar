import React from "react";
import axios from "axios";
import CreateShop from "./createShop";
import EditShop from "./editShop";
import ViewShop from "./viewShop";

const ListShops = (props) => {
    const [shops, setShops] = React.useState([]);
    const [shopCategories, setShopCategories] = React.useState([]);
    const [shopTypes, setShopTypes] = React.useState([]);
    const [create, setCreate] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [view, setView] = React.useState(false);
    const [shopID, setShopID] = React.useState("");
    const [shopCategory, setShopCategory] = React.useState("");
    const [shopType, setShopType] = React.useState("");
    const [vacant, setVacant] = React.useState(true);
    const [bazar, setBazar] = React.useState("");
    const [size, setSize] = React.useState("");
    React.useEffect(() => {
        axios
            .get("http://localhost:8000/shops")
            .then(response => {
                setShops(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        axios
            .get("http://localhost:8000/shopCategories")
            .then(response => {
                setShopCategories(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        axios
            .get("http://localhost:8000/shopTypes")
            .then(response => {
                setShopTypes(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleCreate = () => {
        setCreate(true);
    };

    const handleEdit = shop => {
        setShopID(shop.shopID);
        setShopCategory(shop.shopCategory);
        setShopType(shop.shopType);
        setVacant(shop.vacant);
        setBazar(shop.bazar);
        setSize(shop.size);
        setEdit(true);
    };

    const handleView = shop => {
        setShopID(shop.shopID);
        setShopCategory(shop.shopCategory);
        setShopType(shop.shopType);
        setVacant(shop.vacant);
        setBazar(shop.bazar);
        setSize(shop.size);
        setView(true);
    };

    const handleDelete = shop => {
        axios
            .delete("http://localhost:8000/shops/".concat(shop.shopID))
            .then(response => {
                console.log(response.data);
                setShops(shops.filter(s => s.shopID !== shop.shopID));
            }
            )
            .catch(error => {
                console.error(error);
            });
    }

    const handleCreateSubmit = shop => {
        axios
            .post("http://localhost:8000/shops", {
                shopID: shop.shopID,
                shopCategory: shop.shopCategory,
                shopType: shop.shopType,
                vacant: shop.vacant,
                bazar: shop.bazar,
                size: shop.size
            })
            .then(response => {
                console.log(response.data);
                setShops([...shops, response.data]);
                setCreate(false);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleEditSubmit = shop => {
        axios
            .put("http://localhost:8000/shops/".concat(shop.shopID), {
                shopID: shop.shopID,
                shopCategory: shop.shopCategory,
                shopType: shop.shopType,
                vacant: shop.vacant,
                bazar: shop.bazar,
                size: shop.size
            })
            .then(response => {
                console.log(response.data);
                setShops(shops.map(s => s.shopID === shop.shopID ? response.data : s));
                setEdit(false);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleCancel = () => {
        setCreate(false);
        setEdit(false);
        setView(false);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 card card-body mt-5">
                    <h3>List of Shops</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Shop ID</th>
                                <th>Shop Category</th>
                                <th>Shop Type</th>
                                <th>Vacant</th>
                                <th>Bazar</th>
                                <th>Size</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shops.map(shop => (
                                <tr key={shop.shopID}>
                                    <td>{shop.shopID}</td>
                                    <td>{shop.shopCategory}</td>
                                    <td>{shop.shopType}</td>
                                    <td>{shop.vacant ? "Yes" : "No"}</td>
                                    <td>{shop.bazar}</td>
                                    <td>{shop.size}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleEdit(shop)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-primary btn-sm ml-1"
                                            onClick={() => handleView(shop)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm ml-1"
                                            onClick={() => handleDelete(shop)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-primary" onClick={handleCreate}>
                        Create
                    </button>
                </div>
            </div>
            {create ? (
                <CreateShop
                    shopCategories={shopCategories}
                    shopTypes={shopTypes}
                    onSubmit={handleCreateSubmit}
                    onCancel={handleCancel}
                />
            ) : null}
            {edit ? (
                <EditShop
                    shopID={shopID}
                    shopCategory={shopCategory}
                    shopType={shopType}
                    vacant={vacant}
                    bazar={bazar}
                    size={size}
                    shopCategories={shopCategories}
                    shopTypes={shopTypes}
                    onSubmit={handleEditSubmit}
                    onCancel={handleCancel}
                />
            ) : null}
            {view ? (
                <ViewShop
                    shopID={shopID}
                    shopCategory={shopCategory}
                    shopType={shopType}
                    vacant={vacant}
                    bazar={bazar}
                    size={size}
                    onCancel={handleCancel}
                />
            ) : null}
        </div>
    );
}

export default ListShops;