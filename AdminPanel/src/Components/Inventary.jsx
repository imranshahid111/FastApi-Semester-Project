import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Inventary = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/store/store/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/store/store/products/${id}`);
      // Refresh list after delete
      getAllProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-start">All Product List</h1>
      <div className="row">
        {products.map((p) => (
          <div className="col-md-4 col-sm-6 mb-4" key={p.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={p.image}
                className="card-img-top"
                alt={p.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text text-muted">{p.description}</p>
                <p className="card-text mt-auto">
                  <strong>Category:</strong> {p.category?.name || 'N/A'}
                </p>
                <p className="card-text">
                  <strong>Price:</strong> ${p.price}
                </p>
              </div>
              <button
                className="btn btn-danger m-2"
                onClick={() => handleDelete(p.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventary;
