import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const[formData, setFormData] = useState({});
  // const[errorMessage, setErrorMessage]= useState(null);
  // const[loading,setLoading]=useState(false);
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange =(e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
    
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password) {
      return dispatch(signInFailure( 'please fill out all fields.'));
    }
    

    try {
      dispatch(signInStart());
      const bodyReq = JSON.stringify(formData);
      
      const res = await fetch('/api/auth/signin',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: bodyReq,
      }); 
      
      const data = await res.json(); 
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      // setLoading(false);
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
     
    
      // setLoading(false);

    }
  //   finally{
  //  setLoading(false);

  //   }

  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto md:flex-row flex-col md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-pink-300 via-orange-300 to-yellow-300 rounded-lg text-white'> TechKnow</span>
            Blog
          </Link>
          <p className='text-sm mt-5'> 
            Transforming Your Thoughts into Words. you can sign in with your email and password or with Google 
          </p>
        </div>
        
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='your email' />
              <TextInput
                type='email'
                placeholder='user@gmail.com'
                id='email' 
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='your password' />
              <TextInput
                type='password'
                placeholder='********'
                id='password' 
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                  loading ? (
                  <>
                  <Spinner size= 'sm'/>
                  <span className='pl-3'>Loading....</span>
                  </>
                ) : ('Sign In')
                }
            </Button>
            <OAuth/>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span> Don't Have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign-UP
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  );
}

