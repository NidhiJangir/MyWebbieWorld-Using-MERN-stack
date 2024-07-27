import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  

const {storeTokenInLS} = useAuth();   
const navigate = useNavigate();

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,//spread operator
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response =await fetch(`http://localhost:5001/api/auth/register`, {
      method:"Post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(user),
    })
    const res_data= await response.json(); 
      console.log("response from server",res_data.message);
    if(response.ok){
     

      storeTokenInLS(res_data.token);
      setUser( {username: "",email: "",phone: "",password: ""},)
      toast.success("Registration Successful");
      navigate("/login");
    }
    else{
      toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
    }
 
    } catch (error) {
      console.log("register",error);
    }
    
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">Username : </label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="Enter username"
                    />
                  </div><br />
                  <div>
                    <label htmlFor="Enter email">Email : </label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="Enter email"
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="phone">Phone : </label>
                     <input
                      type="number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      placeholder="Enter phone no."
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="password">Password : </label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="Enter password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};