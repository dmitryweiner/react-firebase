import React, { Suspense } from 'react';
import './App.css';
import 'firebase/database';
import 'firebase/auth';
import {
  AuthCheck,
} from 'reactfire';
import LogInForm from './components/LogInForm';
import Chat from './components/Chat';

function App() {
  return (
      <Suspense fallback="Loading...">
        <AuthCheck fallback={<LogInForm />}><Chat /></AuthCheck>
      </Suspense>
  );
}

export default App;
