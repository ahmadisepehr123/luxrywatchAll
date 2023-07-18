import React, { useState } from "react"; 
import './Signin.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signin = ({loadUser}) => {
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
        const notiferr = () => toast.error('ایمیل یا پسورد اشتباه است', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    const navigate = useNavigate(); 

    const onSubmitSignIn = () => {
        fetch('http://localhost:3002/signin' ,{
            method:'post',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
           if(user.id){
                loadUser(user);
                navigate('/home');  
                console.log(user)
            }else{
                notiferr()
            } 
        })
    }

    return (
      
        <>  
           <div className="container" >
           
                <div className="card">
                    <p id="p-login" className="f3">Login</p>
                    <div className="inputBox1">
                        <input type="text" required="required" onChange={(event) => setSignInEmail(event.target.value)} />
                        <span className="user">Email</span>
                    </div>
                    <div className="inputBox">
                        <input type="password" required="required" onChange={(event) => setSignInPassword(event.target.value)}/>
                        <span>Password</span>
                    </div>
   
                    <button className="enter" onClick={onSubmitSignIn}>Enter</button>

                    <p className="pointer grow f4 underline black-90 " onClick={() => navigate('/register')}>
                        Don't have account? Click
                    </p> 

           
        </div>
       
                </div>
               
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
               
        </>
     
    );
}

export default Signin;





