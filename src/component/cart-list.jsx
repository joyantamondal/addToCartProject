import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartListRequest, RemoveCartRequest } from "../APIRequest/APIRequest";
import Loading from "./loading";


const CartList = () => {
  let [list, setList]= useState([])
  let [loading,setLoading] = useState("d-none")
 let navigate = useNavigate();
  useEffect(()=>{
   (async ()=>{
     setLoading("");
     let res = await CartListRequest();
     setLoading("d-none");
     setList(res);
   })()
  },[])

  const RemoveCart = async(id)=>{
    if(sessionStorage.getItem('token')){
      setLoading("");
      let res = await RemoveCartRequest(id);
      
      //Refresh The Cart List 
      let CartList = await CartListRequest();
      setList(CartList)

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
              <img className="card-img-top w-100" src={item["product"]["image"]} />
                <p className="p-1 fw-light m-0">{item["product"]["title"]}</p>
                <p className="p-1 fw-bold m-0">BDT {item["product"]["price"]}</p>
                <button type="button" onClick={async ()=>{ await RemoveCart(item["product"]['id'])}} class="btn mt-2 float-end fw-light btn-danger"> Remove</button>
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

export default CartList;