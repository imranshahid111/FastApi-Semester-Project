import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Products = () => {
  const [data, setData] = useState([]);
  const [Filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);

  let componentMount = true;

  useEffect(() => {
    let componentMount = true;
  
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/v1/product/products");
        if (componentMount) {
          const data = await response.json();
          setData(data.data || []);
          setFilter(data.data || []);
          console.log(filter);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
  
    getProduct();
  
    return () => {
      componentMount = false;
    };
  }, []);
  


  const ProductFilter = (cat) =>{
    const updatedList = data.filter((x)=>x.category === cat);
    setFilter(updatedList);
  }

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button onClick={()=>setFilter(data)} className="btn btn-outline-dark me-2">All</button>
          <button onClick={()=>ProductFilter("men's clothing")} className="btn btn-outline-dark me-2">Men's Clothing</button>
          <button onClick={()=>ProductFilter("women's clothing")} className="btn btn-outline-dark me-2">Women's Clothing</button>
          <button onClick={()=>ProductFilter("jewelery")} className="btn btn-outline-dark me-2">Jewelery</button>
          <button onClick={()=>ProductFilter("electronics")} className="btn btn-outline-dark me-2">Electronic</button>
        </div>
        {Filter.map((product) => {
          return (
            <>
            <div className="col-md-3 mb-4">
              <div className="card h-100 text-center p-4" style={{ width: "18rem" }} key={product._id}>
                <img src={product.image} className="card-img-top"  height="250px" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title mb-0" >{product.title.substring(0,12)}</h5>
                  <p className="card-text lead fw-bolder">
                   ${product.price}
                  </p>
                  <Link to={`/products/${product._id}`}   className="btn btn-outline-dark">
                    Buy Now
                  </Link>
                </div>
              </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  const Loading = () => {
    return <div>Loading...</div>;
  };

  return (
    <>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
