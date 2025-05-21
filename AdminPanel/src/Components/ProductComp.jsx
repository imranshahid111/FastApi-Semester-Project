import React, { useState , useEffect} from 'react'

import axios from 'axios';
import {Select} from 'antd'
import { useNavigate } from 'react-router-dom';

const {Option} = Select


const ProductComp = () => {


    const navigate = new useNavigate()
    const [categories , setcategories] = useState([])
    const [name , setName] =  useState("")
    const [description , setDescription] =  useState("")
    const [Category , setCategory] =  useState("")
    const [price , setPrice] =  useState("")
    const [quantity , setQuantity] =  useState("")
    const [shiping , setShiping] =  useState("")
    const [photo , setPhoto] =  useState("")
  
  
  
    const getallCategories = async () =>{
      try {
        const {data} = await axios.get('http://localhost:8000/catgeory/categories')
      
          setcategories(data);
      
      } catch (error) {
        console.log(error);
        
      }
    }
  
    useEffect(()=>{
      getallCategories();
    },[])
  
 const handleCreate = async (e) => {
  e.preventDefault();

  // Basic validation
  if (!name.trim()) return alert("Name is required");
  if (!description.trim()) return alert("Description is required");
  if (!price || isNaN(price) || parseFloat(price) <= 0) return alert("Enter a valid price");
  if (!quantity || isNaN(quantity) || parseInt(quantity) <= 0) return alert("Enter a valid quantity");
  if (!Category) return alert("Please select a category");
  if (!shiping) return alert("Please select shipping option");
  if (!photo) return alert("Please upload a product image");

  try {
    const formData = new FormData();
    formData.append("title", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category_id", Category);
    formData.append("image", photo);

    const { data } = await axios.post(
      'http://127.0.0.1:8000/store/store/products/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    console.log('Product created successfully:', data);
    navigate('/');
  } catch (error) {
    console.error('Error creating product:', error.response?.data || error.message);
  }
};


  
  return (
    <>
        <div className='container-fluid w-75'>
            <div className='row'>
                <h1>Create Product</h1>
            </div>
            <div className='m-1'>
                  <Select bordered={false} placeholder="Select a category" size="larger"
                  showSearch className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
                      {categories.map((c)=>{
                        return(
                          <>
                          <Option key={c.id} value={c.id} >
                            {c.name}
                          </Option>
                          </>
                        )
                      })}
                  </Select>
                  <div className='mb-3'>
                    <label className='btn btn-outline-secondary col-md-12'>
                        {photo ? photo.name : "Upload Photo"}
                        <input 
                        type='file' 
                        name ="photo" 
                        accept='image/*'
                        onChange={(e)=>setPhoto(e.target.files[0])}
                        hidden
                        required
                        />
                    </label>
                  </div>
                  <div className='mb-3'>
                    { photo && (
                      <div className='text-center'>
                      <img src={URL.createObjectURL(photo)} alt='product_photo' height={"200px"} className='img img-responsive' />
                      </div>  
                    )}
                 
                  </div>
                 
                  <div className='mb-3'>
                    <input type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Write a name' className='form-control'  required/>
                  </div>
                  <div className='mb-3'>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Write a description' className='form-control' rows='3' />
                  </div>
                  <div className='mb-3'>
                    <input type='number' value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='Write a price' className='form-control' />
                  </div>
                  <div className='mb-3'>
                    <input type='number' value={quantity} onChange={(e)=>setQuantity(e.target.value)} placeholder='Write a quantity' className='form-control' />
                  </div>
                  <div className='mb-3'>
                  <Select
                   bordered={false}
                   placeholder="Select Shipping" 
                   size="large" 
                   showSearch 
                   className='form-select mb-3' 
                   onChange={(value)=>setShiping(value)}
                   >
                      <Option value = "0">No</Option>
                      <Option value = "1">Yes</Option>

                  </Select>
                  </div>
                  <button className='btn btn-primary' onClick={handleCreate}>CREACT PRODUCT</button>
                </div>
        </div>
    </>
  )
}

export default ProductComp