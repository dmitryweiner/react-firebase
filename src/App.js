import React, { Suspense } from 'react';
import './App.css';
import 'firebase/auth';
import {
  AuthCheck,
} from 'reactfire';
import LogInForm from './components/LogInForm';
import ChatFirestore from "./components/ChatFirestore";

function App() {
  return (
      <Suspense fallback="Loading...">
        {/*<AuthCheck fallback={<LogInForm />}><Chat /></AuthCheck>*/}
        <AuthCheck fallback={<LogInForm />}><ChatFirestore /></AuthCheck>
      </Suspense>
  );
}

export default App;
