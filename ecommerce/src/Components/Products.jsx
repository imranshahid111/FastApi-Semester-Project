import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let componentMounted = true;

    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/store/store/products");
        const result = await response.json();
        if (componentMounted) {
          setData(result);
          setFilter(result);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();

    return () => {
      componentMounted = false;
    };
  }, []);

  const ProductFilter = (cat) => {
    const updatedList = data.filter((x) => x.category?.name === cat);
    setFilter(updatedList);
  };

  const Loading = () => {
    return <div className="text-center">Loading...</div>;
  };

  const ShowProducts = () => (
    <>
      <div className="buttons d-flex justify-content-center mb-5">
        <button onClick={() => setFilter(data)} className="btn btn-dark me-2">All</button>
        <button onClick={() => ProductFilter("men's clothing")} className="btn btn-outline-dark me-2">Men</button>
        <button onClick={() => ProductFilter("women's clothing")} className="btn btn-outline-dark me-2">Women</button>
        <button onClick={() => ProductFilter("jewelery")} className="btn btn-outline-dark me-2">Jewelery</button>
        <button onClick={() => ProductFilter("electronics")} className="btn btn-outline-dark me-2">Electronics</button>
      </div>

      <div className="row justify-content-center">
        {filter.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card shadow-sm border-0 h-100">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.title}
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{product.title}</h5>
                <p className="text-muted" style={{ fontSize: "0.9rem", height: "60px", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {product.description}
                </p>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span className="fw-bold text-success">${product.price}</span>
                  <Link to={`/products/${product.id}`} className="btn btn-sm btn-outline-primary">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Latest Products</h2>
      {loading ? <Loading /> : <ShowProducts />}
    </div>
  );
};

export default Products;
