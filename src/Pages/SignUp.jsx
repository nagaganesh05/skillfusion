
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Redux/Hooks";
import { setUser } from "../Redux/Slices/Authslice";
import { firebaseAuth, firebaseDB, usersRef } from "../Firebase/FirebaseConfig";

const SignUp = ({ loggingIn, setLoggingIn }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    if (loggingIn) return;
    try {
      setLoggingIn(true);
      const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      await updateProfile(result.user, { displayName: name });

      const { uid } = result.user;
      const userQuery = query(usersRef, where("uid", "==", uid));
      const existingUser = await getDocs(userQuery);

      if (existingUser.empty) {
        await addDoc(collection(firebaseDB, "users"), { uid, name, email });
      }

      dispatch(setUser({ uid, email, name }));
      alert("Sign Up successful. Redirecting...");
      
      navigate("/login"); 
    } catch (error) {
      console.error("Sign Up Error:", error.message);
      alert("Sign Up Failed: " + error.message);
    } finally {
      setLoggingIn(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (loggingIn) return;
    try {
      setLoggingIn(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      const { uid, email, displayName } = result.user;

      const userQuery = query(usersRef, where("uid", "==", uid));
      const existingUser = await getDocs(userQuery);

      if (existingUser.empty) {
        await addDoc(collection(firebaseDB, "users"), { uid, name: displayName, email });
      }

      dispatch(setUser({ uid, email, name: displayName }));
      alert("Google Sign Up successful. Redirecting...");

      navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign Up Error:", error.message);
      alert("Google Sign Up Failed: " + error.message);
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <>
      <h5 className="mt-3 mb-3">Create a New Account</h5>
      <Form onSubmit={handleEmailSignUp}>
        <Form.Group className="mb-3" controlId="signupName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupPassword">
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
          {loggingIn ? "Signing Up..." : "Sign Up"}
        </Button>
      </Form>

      <hr />
      <Button className="w-100 mt-2" variant="primary" onClick={handleGoogleSignUp} disabled={loggingIn}>
        {loggingIn ? "Signing Up..." : "Sign Up with Google"}
      </Button>
    </>
  );
};

export default SignUp;
