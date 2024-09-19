import axios from 'axios';
import { useEffect } from 'react';

export default function LoginPage() {
  useEffect(() => {
    const signIn = async () => {
      try {
        const response = await axios.post('/mock-api/auth/sign-in', {
          email: 'admin@fusetheme.com',
          password: 'admin',
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error signing in:', error);
      }
    };
    signIn();
  }, []);
  return <h1>Login Page</h1>;
}
