

import React, { useEffect } from "react";
import { Container, Button, Card, Image, Row, Col } from "react-bootstrap";
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
      }
    });

    return () => unsubscribe(); 
  }, [navigate, dispatch]);

  const login = async () => {
    try {
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
    }
  };

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
            <Button variant="primary" onClick={login} className="mt-3 w-100">
              Login with Google
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Login;


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
//   const [checkingAuth, setCheckingAuth] = useState(true); // <-- auth check state

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
//         setCheckingAuth(false); // auth check complete
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
//     // Show loading spinner while checking auth state
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

