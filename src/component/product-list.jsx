import { useEffect, useState } from 'react';
import Loading from './loading.jsx';
import { CreateCartRequest, ProductListRequest } from '../APIRequest/APIRequest.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProductList = () => {
 let [list, setList]= useState([])
 let [loading,setLoading] = useState("d-none")
let navigate = useNavigate();
 useEffect(()=>{
  (async ()=>{
    setLoading("");
    let res = await ProductListRequest();
    setLoading("d-none");
    setList(res);
  })()
 },[])

const addToCart = async(id)=>{
  if(sessionStorage.getItem('token')){
    setLoading("");
    let res = await CreateCartRequest(id);
    setLoading("d-none");
    if(res==="success"){
      toast.success("Request Success")
    }
    else{
      toast.error("Something Went Wrong")
    }
  }
  else{
    toast.error("Please Login!")
navigate("/login")
  }

}



return (

   <>
   <div className={loading}><Loading/></div>
  <div className="container section">
    <div className="row">
      { list!==null && list.map((item, index) => {
        return (
          <div key={index} className="col-md-3 p-3">
            <div className="card-body">
              <div className="card animate__animated animate__zoomIn mt-5 shadow-sm rounded-3 border-0 p-0">
              <img className="card-img-top w-100" src={item["image"]} />
                <p className="p-1 fw-light m-0">{item["title"]}</p>
                <p className="p-1 fw-bold m-0">BDT {item["price"]}</p>
                <button type="button" onClick={async ()=>{ await addToCart(item['id'])}} class="btn mt-2 float-end fw-light btn-dark"> Add to Cart  </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
   </>
);

  
};

export default ProductList;
