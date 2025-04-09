

// import React, { useEffect, useState } from "react";
// import { Container, Button, Card, Image, Row, Col, Spinner } from "react-bootstrap";
// import logo from "../assets/logo.png";
// import animation from "../assets/animation.gif";
// import {
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithPopup,
// } from "firebase/auth";
// import { firebaseAuth, firebaseDB, usersRef } from "../Firebase/FirebaseConfig";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../Redux/Hooks";
// import { setUser } from "../Redux/Slices/Authslice";
// import { collection, query, where, addDoc, getDocs } from "firebase/firestore";

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const [checkingAuth, setCheckingAuth] = useState(true);
//   const [loggingIn, setLoggingIn] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
//       if (currentUser) {
//         dispatch(
//           setUser({
//             uid: currentUser.uid,
//             email: currentUser.email,
//             name: currentUser.displayName,
//           })
//         );
//         navigate("/dashboard");
//       } else {
//         setCheckingAuth(false);
//       }
//     });

//     return () => unsubscribe();
//   }, [navigate, dispatch]);

//   const login = async () => {
//     if (loggingIn) return; // prevent multiple login calls

//     try {
//       setLoggingIn(true);
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(firebaseAuth, provider);
//       const { displayName, email, uid } = result.user;

//       if (email) {
//         const firestoreQuery = query(usersRef, where("uid", "==", uid));
//         const fetchedUser = await getDocs(firestoreQuery);

//         if (fetchedUser.docs.length === 0) {
//           await addDoc(collection(firebaseDB, "users"), {
//             uid,
//             name: displayName,
//             email,
//           });
//         }

//         dispatch(setUser({ uid, email, name: displayName }));
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//     } finally {
//       setLoggingIn(false);
//     }
//   };

//   if (checkingAuth) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center vh-100">
//         <Spinner animation="border" role="status" />
//       </Container>
//     );
//   }

//   return (
//     <Container className="d-flex justify-content-center align-items-center vh-100">
//       <Card className="p-4" style={{ width: "50rem" }}>
//         <Row className="align-items-center">
//           <Col xs={12} md={6} className="text-center">
//             <Image src={animation} alt="animation" fluid />
//           </Col>
//           <Col
//             xs={12}
//             md={6}
//             className="text-center d-flex flex-column align-items-center"
//           >
//             <Image src={logo} alt="logo" fluid style={{ maxWidth: "300px" }} />
//             <h3 className="mt-3">
//               <span>One Platform to </span>
//               <span className="text-primary">connect</span>
//             </h3>
//             <Button
//               variant="primary"
//               onClick={login}
//               className="mt-3 w-100"
//               disabled={loggingIn}
//             >
//               {loggingIn ? "Logging in..." : "Login with Google"}
//             </Button>
//           </Col>
//         </Row>
//       </Card>
//     </Container>
//   );
// };

// export default Login;




import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Image, Spinner } from "react-bootstrap";
import logo from "../assets/logo.png";
import animation from "../assets/animation.gif";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Redux/Hooks";
import { setUser } from "../Redux/Slices/Authslice";
import { firebaseAuth } from "../Firebase/FirebaseConfig";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName || "User",
          })
        );
        navigate("/dashboard");
      } else {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  if (checkingAuth) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="d-flex justify-content-center  align-items-center vh-100 bg-light">
      <Card className="shadow-lg p-4 rounded-4 w-100" style={{ maxWidth: "960px" }}>
        <Row className="align-items-center">
          <Col md={6} className="text-center mb-4 mb-md-0 ">
            <Image src={animation}  alt="animation"  fluid style={{ maxHeight: "300px" }} />
            <h4 className="mt-3 fw-semibold text-primary">Welcome to SkillFusion</h4>
            <p className="text-muted px-3">Connect & Share Skills in 1:1 Live Sessions</p>
          </Col>
          <Col md={6} className="px-4">
            <div className="text-center mb-3">
              <Image src={logo} alt="logo" fluid style={{ maxWidth: "160px", maxHeight:"auto"}} />
            </div>
            {showSignIn ? (
              <SignIn loggingIn={loggingIn} setLoggingIn={setLoggingIn} />
            ) : (
              <SignUp loggingIn={loggingIn} setLoggingIn={setLoggingIn} />
            )}
            <Button
              variant="link"
              className="mt-3 w-100 text-decoration-none"
              onClick={() => setShowSignIn(!showSignIn)}
            >
              {showSignIn
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Login;
