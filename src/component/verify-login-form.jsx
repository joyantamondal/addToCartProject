import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { VerifyLoginRequest } from "../APIRequest/APIRequest";
import { useState } from 'react';
import Loading from './loading';


const VerifyLoginForm = () => {
    let [loading,setLoading] = useState("d-none");
    let navigate = useNavigate();
  const submitForm = async(event)=>{
  event.preventDefault();
  let formData = new FormData(event.target);
  let OTP = formData.get('OTP');
  setLoading("");
  let data = await VerifyLoginRequest(OTP);
  setLoading("d-none");
  toast.success("Verification Success");
  sessionStorage.removeItem('email');
  sessionStorage.setItem("token",data)
  navigate("/")
  }
   


    return (
        <>
        <div className={loading}><Loading/></div>
        <div className="container section">
                <div className="row justify-content-center align-items-center">
                    <div className="col-5">
                        <div className="card mt-5 shadow-sm rounded-3 border-0 p-5">
                            <h4>Enter 6 Digit Verification Code</h4>
                            <form onSubmit={submitForm}>
                                <input type="text" name="OTP" className="form-control mt-3"
                                       placeholder="Verification Code"/>
                                <button type="submit" className="btn w-100 mb-4 mt-3 btn-dark">Next</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default VerifyLoginForm;