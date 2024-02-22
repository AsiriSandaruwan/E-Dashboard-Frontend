import React, { useState } from "react";

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        company: ""
    });

    const [error, setError] = useState(false);

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    const addProduct = async () =>{
        if(!product.name || !product.price || !product.category || !product.company){
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem("user"))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: "POST",
            body: JSON.stringify({
                name: product.name,
                price: product.price,
                category: product.category,
                company: product.company,
                userId: userId
            }),
            headers: {
                'Content-Type': 'application/json'  
            }       
        });
        result = await result.json();
        console.warn(result);
    }

    return (
        <div className="product"> 
            <h1 style={{ textAlign: "left",paddingLeft: "85px" }}>Add Product</h1>
            <input className="inputBox" type="text" placeholder="Enter Product Name" value={product.name} name="name" onChange={handleChange}/>
            {error && !product.name && <span className="invalid-input" >Enter valid name</span>}
            <input  className="inputBox"  type="text" placeholder="Enter Product Price" value={product.price} name="price" onChange={handleChange} />
            {error && !product.price && <span className="invalid-input" >Enter valid price</span>}
            <input className="inputBox" type="text" placeholder="Enter Product Category" value={product.category} name="category" onChange={handleChange} />
            {error && !product.category && <span className="invalid-input" >Enter valid category</span>}
            <input className="inputBox" type="text" placeholder="Enter Product Company" value={product.company} name="company" onChange={handleChange} />
            {error && !product.company && <span className="invalid-input" >Enter valid company</span>}
            <button className="appButton" onClick={addProduct}>Add Product</button>

        </div>
    )
};

export default AddProduct