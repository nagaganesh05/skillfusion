

// // import React, { useEffect } from "react";
// // import { Container, Button, Card, Image, Row, Col } from "react-bootstrap";
// // import logo from "../assets/logo.png";
// // import animation from "../assets/animation.gif";
// // import {
// //   GoogleAuthProvider,
// //   onAuthStateChanged,
// //   signInWithPopup,
// // } from "firebase/auth";
// // import { firebaseAuth, firebaseDB, usersRef } from "../Firebase/FirebaseConfig";
// // import { useNavigate } from "react-router-dom";
// // import { useAppDispatch } from "../Redux/Hooks";
// // import { setUser } from "../Redux/Slices/Authslice";
// // import { collection, query, where, addDoc, getDocs } from "firebase/firestore";

// // const Login = () => {
// //   const navigate = useNavigate();
// //   const dispatch = useAppDispatch();

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
// //       if (currentUser) {
// //         dispatch(
// //           setUser({
// //             uid: currentUser.uid,
// //             email: currentUser.email,
// //             name: currentUser.displayName,
// //           })
// //         );
// //         navigate("/dashboard");
// //       }
// //     });

// //     return () => unsubscribe(); 
// //   }, [navigate, dispatch]);

// //   const login = async () => {
// //     try {
// //       const provider = new GoogleAuthProvider();
// //       const result = await signInWithPopup(firebaseAuth, provider);
// //       const { displayName, email, uid } = result.user;

// //       if (email) {
// //         const firestoreQuery = query(usersRef, where("uid", "==", uid));
// //         const fetchedUser = await getDocs(firestoreQuery);

// //         if (fetchedUser.docs.length === 0) {
// //           await addDoc(collection(firebaseDB, "users"), {
// //             uid,
// //             name: displayName,
// //             email,
// //           });
// //         }

// //         dispatch(setUser({ uid, email, name: displayName }));
// //         navigate("/dashboard");
// //       }
// //     } catch (error) {
// //       console.error("Login error:", error);
// //     }
// //   };

// //   return (
// //     <Container className="d-flex justify-content-center align-items-center vh-100">
// //       <Card className="p-4" style={{ width: "50rem" }}>
// //         <Row className="align-items-center">
// //           <Col xs={12} md={6} className="text-center">
// //             <Image src={animation} alt="animation" fluid />
// //           </Col>
// //           <Col
// //             xs={12}
// //             md={6}
// //             className="text-center d-flex flex-column align-items-center"
// //           >
// //             <Image src={logo} alt="logo" fluid style={{ maxWidth: "300px" }} />
// //             <h3 className="mt-3">
// //               <span>One Platform to </span>
// //               <span className="text-primary">connect</span>
// //             </h3>
// //             <Button variant="primary" onClick={login} className="mt-3 w-100">
// //               Login with Google
// //             </Button>
// //           </Col>
// //         </Row>
// //       </Card>
// //     </Container>
// //   );
// // };

// // export default Login;


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
//     try {
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
//             <Button variant="primary" onClick={login} className="mt-3 w-100">
//               Login with Google
//             </Button>
//           </Col>
//         </Row>
//       </Card>
//     </Container>
//   );
// };

// export default Login;



import React, { useEffect, useState } from "react";
import { Container, Button, Card, Image, Row, Col, Spinner } from "react-bootstrap";
import logo from "../assets/logo.png";
import animation from "../assets/animation.gif";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth, firebaseDB, usersRef } from "../Firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Redux/Hooks";
import { setUser } from "../Redux/Slices/Authslice";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName,
          })
        );
        navigate("/dashboard");
      } else {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [navigate, dispatch]);

  const login = async () => {
    if (loggingIn) return; // prevent multiple login calls

    try {
      setLoggingIn(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      const { displayName, email, uid } = result.user;

      if (email) {
        const firestoreQuery = query(usersRef, where("uid", "==", uid));
        const fetchedUser = await getDocs(firestoreQuery);

        if (fetchedUser.docs.length === 0) {
          await addDoc(collection(firebaseDB, "users"), {
            uid,
            name: displayName,
            email,
          });
        }

        dispatch(setUser({ uid, email, name: displayName }));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoggingIn(false);
    }
  };

  if (checkingAuth) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4" style={{ width: "50rem" }}>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="text-center">
            <Image src={animation} alt="animation" fluid />
          </Col>
          <Col
            xs={12}
            md={6}
            className="text-center d-flex flex-column align-items-center"
          >
            <Image src={logo} alt="logo" fluid style={{ maxWidth: "300px" }} />
            <h3 className="mt-3">
              <span>One Platform to </span>
              <span className="text-primary">connect</span>
            </h3>
            <Button
              variant="primary"
              onClick={login}
              className="mt-3 w-100"
              disabled={loggingIn}
            >
              {loggingIn ? "Logging in..." : "Login with Google"}
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Login;




// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Button,
//   Card,
//   Image,
//   Row,
//   Col,
//   Spinner,
//   Form,
//   Alert,
// } from "react-bootstrap";
// import logo from "../assets/logo.png";
// import animation from "../assets/animation.gif";
// import {
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithPopup,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
// import {
//   firebaseAuth,
//   firebaseDB,
//   usersRef,
// } from "../Firebase/FirebaseConfig";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../Redux/Hooks";
// import { setUser } from "../Redux/Slices/Authslice";
// import { collection, query, where, addDoc, getDocs } from "firebase/firestore";

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const [checkingAuth, setCheckingAuth] = useState(true);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginError, setLoginError] = useState("");

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
//       if (currentUser) {
//         dispatch(
//           setUser({
//             uid: currentUser.uid,
//             email: currentUser.email,
//             name: currentUser.displayName || currentUser.email,
//           })
//         );
//         navigate("/dashboard");
//       } else {
//         setCheckingAuth(false);
//       }
//     });

//     return () => unsubscribe();
//   }, [navigate, dispatch]);

//   const handleGoogleLogin = async () => {
//     try {
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
//       console.error("Google Login Error:", error);
//     }
//   };

//   const handleEmailLogin = async (e) => {
//     e.preventDefault();
//     setLoginError("");

//     try {
//       const result = await signInWithEmailAndPassword(
//         firebaseAuth,
//         email,
//         password
//       );

//       const { uid, email: userEmail, displayName } = result.user;

//       dispatch(
//         setUser({
//           uid,
//           email: userEmail,
//           name: displayName || userEmail,
//         })
//       );
//       navigate("/dashboard");
//     } catch (err) {
//       setLoginError("Invalid email or password. Please try again.");
//     }
//   };

//   const handleGuestLogin = () => {
//     dispatch(
//       setUser({
//         uid: "guest",
//         email: "guest@demo.com",
//         name: "Guest User",
//       })
//     );
//     navigate("/dashboard");
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
//       <Card className="p-4 w-100" style={{ maxWidth: "60rem" }}>
//         <Row className="align-items-center">
//           <Col xs={12} md={6} className="text-center mb-4 mb-md-0">
//             <Image src={animation} alt="animation" fluid />
//           </Col>

//           <Col xs={12} md={6} className="d-flex flex-column align-items-center">
//             <Image src={logo} alt="logo" fluid style={{ maxWidth: "300px" }} />
//             <h3 className="mt-3 mb-4">
//               <span>One Platform to </span>
//               <span className="text-primary">connect</span>
//             </h3>

//             <Form onSubmit={handleEmailLogin} className="w-100">
//               {loginError && <Alert variant="danger">{loginError}</Alert>}
//               <Form.Group controlId="formEmail" className="mb-3">
//                 <Form.Label>Email address</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group controlId="formPassword" className="mb-3">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </Form.Group>

//               <Button type="submit" variant="success" className="w-100 mb-2">
//                 Login with Email
//               </Button>
//             </Form>

//             <Button
//               variant="primary"
//               onClick={handleGoogleLogin}
//               className="w-100 mb-2"
//             >
//               Login with Google
//             </Button>

//             <Button variant="secondary" onClick={handleGuestLogin} className="w-100">
//               Continue as Guest
//             </Button>
//           </Col>
//         </Row>
//       </Card>
//     </Container>
//   );
// };

// export default Login;

