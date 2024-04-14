import React, { useState } from 'react';

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleSignUp = () => {
    // Implement your sign-up logic here
    console.log({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      termsAgreed
    });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={termsAgreed}
            onChange={() => setTermsAgreed(!termsAgreed)}
          />
          I agree to the terms and conditions
        </label>
        <button type="submit" disabled={!termsAgreed}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
