import './App.css';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
  const login = useGoogleLogin({
    onSuccess: response => {
      console.log(response)
      const { code } = response;
      axios
        .post('/webapi/create-token', { code })
        .then(response => {
          console.log('from-BE')
          console.log(response)
          console.log({
            this_is_what_you_need: response.data.refresh_token
          })
          // get the response.data.refresh_token
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    onError: response => {
      console.log(response)
    },
    flow: 'auth-code',
    scope: 'openid email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/drive'
  });

  return (
    <div className="App">
      <div>
        <button
          onClick={() => login()}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default App;
