import React, { Children, useEffect, useState } from 'react'
import axios from 'axios';
import { Modal } from 'antd';
import CategoryForm from './CategoryForm';



const CreateCategory = () => {
    const [categories , setcategories] = useState([]);
    const [name ,setname] = useState("");
    const [visible , setvisible] = useState(false);
    const [selected ,setSelected] = useState(null);
    const [updateName ,setUpdateName] = useState("")
  
  
  
    const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post('http://localhost:8000/catgeory/categories', { name });

    // If your new API doesn't return `success`, just assume success on 200 response
    toast.success(`${name} is created`);
    setname(""); // clear input after success
    getallCategories(); // refetch categories
  } catch (error) {
    console.log(error);
    toast.error("Failed to create category");
  }
};

  
   const getallCategories = async () => {
        try {
          const { data } = await axios.get('http://localhost:8000/catgeory/categories/');
          setcategories(data); 
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(()=>{
      getallCategories();
    },[])
    const handleUpdate = async(e)=>{
      e.preventDefault();
      try {
        const {data} = await axios.put(`http://localhost:8080/api/v1/category/update-category/${selected._id}`,{name:updateName})
        if(data?.success)
        {
          toast.success(data.message)
          setSelected(null);
          setUpdateName("")
          setvisible(false);
          getallCategories();
        }
        else{
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    }
  
    const HandleDelete = async(pid)=>{
      
      try {
        const {data} = await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${pid}`)
        if(data?.success)
        {
          toast.success(data.message)
  
          getallCategories();
        }
        else{
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    }
  return (
    <div className='container-fluid w-75'>
            <div className='row'>
                <h1>Create Category</h1>
                <div className='p-3 w-50'>
                    <CategoryForm  handleSubmit={handleSubmit} value={name} setValue={setname}/>
                </div>
                <div className='w-75'>
            <table className="table table-dark">
            <thead>
              <tr>
              
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                categories?.map((c)=>(
                <> 
              <tr>
                <td>
                  {c.name}
                  </td>
                  <td>
                    <button className='btn btn-primary ms-2' onClick={()=>{setvisible(true) ; setUpdateName(c.name);setSelected(c)}}>Edit</button>
                    <button className='btn btn-danger ms-2 ' onClick={()=>{HandleDelete(c._id)}}>Delete</button>

                  </td>
              </tr>
                  </>)
                  )
                
              }
            </tbody>
          </table>

                </div>
                <Modal onCancel={()=>setvisible(false)} footer={null} visible={visible}>
                  <CategoryForm value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate} />
                </Modal>
              </div>

          </div>
         
  )
}

export default CreateCategory