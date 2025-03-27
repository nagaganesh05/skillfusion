
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Redux/Hooks";
import { setUser } from "../Redux/Slices/Authslice";
import { firebaseAuth } from "../Firebase/FirebaseConfig";

const SignIn = ({ loggingIn, setLoggingIn }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    if (loggingIn) return;
    try {
      setLoggingIn(true);
      const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const { uid, email: userEmail, displayName } = result.user;

      dispatch(setUser({ uid, email: userEmail, name: displayName || "User" }));
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Sign In Error:", error.message);
      alert("Sign In Failed: " + error.message);
    } finally {
      setLoggingIn(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (loggingIn) return;
    try {
      setLoggingIn(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      const { uid, email: userEmail, displayName } = result.user;

      dispatch(setUser({ uid, email: userEmail, name: displayName }));
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign In Error:", error.message);
      alert("Google Sign In Failed: " + error.message);
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <>
      <h5 className="mt-3 mb-3">Sign In to Your Account</h5>
      <Form onSubmit={handleEmailSignIn}>
        <Form.Group className="mb-3" controlId="signinEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signinPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100" disabled={loggingIn}>
          {loggingIn ? "Signing In..." : "Sign In"}
        </Button>
      </Form>

      <hr />
      <Button className="w-100 mt-2" variant="primary" onClick={handleGoogleSignIn} disabled={loggingIn}>
        {loggingIn ? "Signing In..." : "Sign In with Google"}
      </Button>
    </>
  );
};

export default SignIn;
