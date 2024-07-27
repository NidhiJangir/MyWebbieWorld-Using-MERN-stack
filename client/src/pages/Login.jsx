import { useState } from "react";
// To redirect useer to the other pages we use navigate
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";

const URL="http://localhost:5001/api/auth/login";


export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth(); 
  // let handle the input field value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method :"POST",
        headers:{
          "Content-Type":"application/json",

        },
        body: JSON.stringify(user),
      });
      const res_data= await response.json();
      console.log("response from server",res_data); 
      if(response.ok){
        toast.success("Login Successful")
        storeTokenInLS(res_data.token);
        setUser( {email: "",password: ""});
        navigate("/"); 
      }
      else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      
       
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
                  alt="let's fill the login form"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">Email : </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="Enter email"
                    />
                  </div>
                  <br/>
                  <div>
                    <label htmlFor="password">Password : </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      required
                      value={user.password}
                      onChange={handleInput}
                      placeholder="Enter password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                   Login Now
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