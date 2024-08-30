import {createContext, useContext, useEffect, useState} from "react";



export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [token , setToken] = useState(localStorage.getItem("token"));
    const [user,setUser]= useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState("");
    const authorizationToken = `Bearer ${token}`;
    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    }

    let isLoggedIn = !!token;
    console.log("IsLoggedIn" , isLoggedIn);

    const LogoutUser=() => {
            setToken("");
            return localStorage.removeItem("token");
    };


    //currently loggedIn user data


const userAuthentication = async () =>{
    try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5001/api/auth/user", {
            method: "GET",
            headers: {
                Authorization: authorizationToken,
            },
        });

        if(response.ok){
            const data = await response.json();
            console.log("user data", data.userData);
            setUser(data.userData);
            setIsLoading(false);
            
        }else{
            console.log("Error fetching in user data");
            setIsLoading(false);
            
        }
    } catch (error) {
        console.log("error fetching user data");
    }
};


const getServices = async() =>{
    try {
        const response = await fetch("http://localhost:5001/api/data/service",{
            method: "GET",
        });
        if(response.ok){
            const resp = await response.json();
            console.log(resp.data);
             setServices(resp.data);
        }
    } catch (error) {
        console.log(`services frontend error: ${error}`);
    }
}
    useEffect(() => {
        getServices();
        userAuthentication();
    },[]);

//     const getServiceData = async () =>{
//          try {
//              const response = await fetch( "http: //localhost: 5ØØØ/api/data/service" , 
//              { 
//                 method: " GET" ,
//             });
//  if (response.ok){
//      const services = await response.json();
//       setServices(services.data) ;
//  }
// console.log("service" ,response); 
// }
// catch (error){
//  console.log(error);
// }
//     };
useEffect(() =>	{ 
    //getServiceData(); 
    userAuthentication();
}, []);


    return (
    <AuthContext.Provider value={{isLoggedIn, storeTokenInLS, LogoutUser,user,services,authorizationToken,isLoading}}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
}