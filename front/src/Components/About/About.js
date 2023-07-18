import React from "react"; 
import './About.css'
import Navigation from '../Navigation/Navigation.js';
const About = () => {
 
   return (
   
     <div>
       
         <div className="card">
    <div className="image">
      <img src="https://sepehrdev.netlify.app/profile.6ee28169.a55f5427.jpg" alt="Me"/>
    </div>
    <div className="details">
      <div className="center">
        <h1 id="h1introduce"> من سپهرم و این سایتی که میبنید<br/><br/></h1>
        <span className="introduce">برنامه نویسش منم </span>
        <p id="pintroduce">این لینک هایی که زیر میبینید از این لینک ها میتونید با من درارتباط باشید.همچنین شما میتونید <span className="span2">سایت</span> من رو دیدن کنید از لینک زیر</p>
        <ul>
          <li><a rel="noreferrer" href="https://twitter.com/sepehrahmadi123?t=3oLNSF3Y2yQERBpAEbEE-g&s=09" className="twitter" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
          <li><a rel="noreferrer" href="https://sepehrdev.netlify.app/" className="google" target="_blank"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
          <li><a rel="noreferrer" href="https://www.linkedin.com/in/sepehr-ahmdi-2a6911278/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BCdAh2BJ3TBaD3apZCiTV6w%3D%3D" target="_blank" className="linkedin"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
          <li><a rel="noreferrer" href="https://instagram.com/sepehrweb.dev?igshid=MzNlNGNkZWQ4Mg==" className="insta" target="_blank"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
        </ul>
      </div>
    </div>
  </div>
  <Navigation/>
           </div>
   );
}

export default About;