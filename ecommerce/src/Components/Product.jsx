import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addCart } from '../redux/action';

const Product = () => {
    const { id } = useParams(); // Correctly destructure id from useParams
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch(addCart(product));
    };

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/api/v1/product/products/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data.product.title); // Access the title after parsing
                setProduct(data.product); // Store only the product object
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getProduct();
    }, [id]); // Add id as a dependency

    const Loading = () => <div>Loading...</div>;

    const ShowProduct = () => {
        if (!product) return null; // Prevent accessing properties of null
        return (
            <>
                <div className='col-md-6'>
                    <img src={product.image} alt={product.title} height="400px" width="400px" />
                </div>
                <div className='col-md-6'>
                    <h4 className='text-uppercase text-black-50'>{product.category}</h4>
                    <h1 className='display-5'>{product.title}</h1>
                    <p className='lead fw-bolder'>
                        Rating {product.rating?.rate || 'N/A'} <i className='fa fa-star'></i>
                    </p>
                    <h3 className='display-6 fw-bold my-4'>${product.price}</h3>
                    <p className='lead'>{product.description}</p>
                    <button className='btn btn-outline-dark' onClick={() => addProduct(product)}>Add to Cart</button>
                </div>
            </>
        );
    };

    return (
        <div className='container mt-5 mb-5'>
            <div className="row">
                {loading ? <Loading /> : error ? <div>Error: {error}</div> : <ShowProduct />}
            </div>
        </div>
    );
};

export default Product;
