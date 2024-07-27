import{ useAuth } from "../store/auth" ;
import React from "react";
export const Service = () => {
   const { services } = useAuth();
    console.log(services);
return(
<section className="section-services">
<div className="container">
<hl className="main-heading">Services </hl> </div>
<div className="container grid grid-three-cols" >
{
  services.map((curElem,index) => 
    { return (
<div className="card" key={index}>
<div className="card-img">
<img src="/images/design.png" alt="designer" width="200" /></div>
<div className="card-details">
<div className="grid grid-two-cols">
<p>{curElem.provider}</p>
<p>{curElem.price}</p>
</div>
<h2>{curElem.service}</h2>
<p>{curElem.description}</p>
</div>
</div>
    );
  })}
</div>
</section>
);
};
