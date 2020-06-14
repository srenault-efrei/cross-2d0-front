import { registerRootComponent } from 'expo';
import React from 'react';
import SignIn from './components/SignIn';
import SignUpIndividual from './components/SignUpIndividual';
import SignUpAssociation from './components/SignUpAssociation';
import ForgotPassword from './components/ForgotPassword';
import Preference from './components/Preference';

function App() {
    return (
      <SignIn></SignIn>
    );
}

export default registerRootComponent(App)