import { registerRootComponent } from 'expo';
import React from 'react';
import SignIn from './components/SignIn';

function App() {
    return (
      <SignIn></SignIn>
    );
}

export default registerRootComponent(App)