import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const UpdateProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        company: ""
    });

    const params = useParams();

    const navigate = useNavigate();

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect (()=>{
        getProductDetails();
    },[])

    const getProductDetails = async () =>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        console.warn(result);  
        setProduct(result); 
    }
    const updateProduct = async () =>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({
                name: product.name,
                price: product.price,
                category: product.category,
                company: product.company
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        if(result){
            navigate("/");
        }
    }

    return (
        <div className="product"> 
            <h1 style={{ textAlign: "left",paddingLeft: "60px" }}>Update Product</h1>
            <input className="inputBox" type="text" placeholder="Enter Product Name" value={product.name} name="name" onChange={handleChange}/>
            <input  className="inputBox"  type="text" placeholder="Enter Product Price" value={product.price} name="price" onChange={handleChange} />
            <input className="inputBox" type="text" placeholder="Enter Product Category" value={product.category} name="category" onChange={handleChange} />
            <input className="inputBox" type="text" placeholder="Enter Product Company" value={product.company} name="company" onChange={handleChange} />
            <button className="appButton" onClick={updateProduct}>Update Product</button>

        </div>
    )
};

export default UpdateProduct