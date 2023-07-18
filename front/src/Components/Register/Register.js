import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

const Register = ({ loadUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const notiferr = () => toast.error('نمیتواند وارد شود لطفا بعدا تلاش کنید', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  
  const notiferr1 = () => toast.error('لطفا برای استفاده از سایت تمامی اطلاعات خواسته شده را پر کنید', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  
  const notiferr2 = () => toast.error('لطفا یک ایمیل معتبر وارد نمایید', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  
  const notiferr3 = () => toast.error('پسورد باید شامل حداقل یک عدد باشد و چهار کاراکتر داشته باشد', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  
  const notiferr4 = () => toast.error('پسورد باید حداقل یک حروف داشته باشد و چهار کاراکتر داشته باشد', {
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
    if (!email || !password || !name) {
      notiferr1();
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      notiferr2();
      return;
    }

    if (!/^(?=.*\d).{4,}$/.test(password)) {
      notiferr3();
      return;
    }

    if (!/(?=.*[a-zA-Z])(?=.*\d).{4,}$/.test(password)) {
      notiferr4();
      return;
    }

    fetch('http://localhost:3002/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
      .then((response) => response.json())
      .then(user => {
        if (user.id) {
          loadUser(user);
          navigate('/home');
        } else {
          notiferr();
        }
      });
  };

  return (
    <div className="container">
      <div className="card">
        <p className="f3">Register</p>
        <div className="inputBox1">
          <input type="text" required="required" onChange={(e) => setEmail(e.target.value)} />
          <span className="user">Email</span>
        </div>
        <div className="inputBox1">
          <input type="text" required="required" onChange={(e) => setName(e.target.value)} />
          <span className="user">Name</span>
        </div>
        <div className="inputBox">
          <input type="password" required="required"onChange={(e) => setPassword(e.target.value)} />
          <span>Password</span>
        </div>
        <button className="enterr" onClick={onSubmitSignIn}>Enter</button>
        <p id="navigate-signin" className="pointer grow f4 underline black-90 " onClick={() => navigate('/signin')}>
         Already have account?login
        </p>
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
    </div>
  );
};

export default Register;