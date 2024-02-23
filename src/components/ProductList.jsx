import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect (()=>{
        getProducts();
    },[])

    const navigate = useNavigate();
    
    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products");
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) =>{
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "DELETE"
        })
        result = await result.json();
        if(result){
            getProducts();
        }
    }

    const searchHandler = async (event) =>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if(result){
                setProducts(result);
            }
        }
        else{
            getProducts();
        }
    }

    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input type="text" className="search-box" placeholder="Search Product" onChange={searchHandler}></input>
            {products.length > 0 ?
                <div>
                    <ul>
                        <li>S. No.</li> 
                        <li>Name</li> 
                        <li>Price</li>
                        <li>Category</li>
                        <li>Action</li>
                    </ul>
                    {
                        products.map((item,index)=>
                            <ul key={item._id}>
                                <li>{index+1}</li> 
                                <li>{item.name}</li> 
                                <li>{item.price}</li>
                                <li>{item.category}</li>
                                <li><button onClick={()=>{navigate(`/update/${item._id}`)}}>Update</button><button onClick={()=>{deleteProduct(item._id)}}>Delete</button></li>
                            </ul>
                        )
                    }
                </div> 
                : <h1>No Products Found</h1>
            }
        </div>
    )
};

export default ProductList