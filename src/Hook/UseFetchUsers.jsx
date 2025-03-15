// import React, { useEffect, useState } from 'react'
// import { useAppSelector } from '../Redux/Hooks'
// import { usersRef } from '../Firebase/FirebaseConfig'
// import { getDocs } from 'firebase/firestore'
// import {UserType} from './Firebase/UserType'

// const UseFetchUsers = () => {
//   const [users,setUsers] = useState<Array<UserType>>([])
//   const uid = useAppSelector((skill)=>skill.auth.userInfo?.uid)
//   useEffect(()=>{
//     if(uid){
//       const getUsers = async () => {
//         const firestoreQuery = query(usersRef,where("uid","!=","uid"))
//         const data = await getDocs(firestoreQuery)
//         const firebaseUsers :Array<UserType> = []
//         data.forEach((user)=>{
//           const userData = user.data() as UserType
//           firebaseUsers.push({
//             ...userData,label:userData.displayName
//           })
//         })
//         setUsers(firebaseUsers)
//       }
//       getUsers()
//     }
//   },[uid])
//   return [users]
// }

// export default UseFetchUsers



import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../Redux/Hooks';
import { usersRef } from '../Firebase/FirebaseConfig';
import { getDocs, query, where } from 'firebase/firestore';

/**
 * Custom hook to fetch users from Firebase
 * @returns {[Array<Object>]} - List of users
 */
const UseFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const uid = useAppSelector((state) => state.auth.userInfo?.uid);

  useEffect(() => {
    if (uid) {
      const getUsers = async () => {
        try {
          const firestoreQuery = query(usersRef, where('uid', '!=', uid));
          const data = await getDocs(firestoreQuery);
          const firebaseUsers = [];

          data.forEach((doc) => {
            const userData = doc.data();
            firebaseUsers.push({
              ...userData,
              label: userData.displayName,
            });
          });

          setUsers(firebaseUsers);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      getUsers();
    }
  }, [uid]);

  return [users];
};

export default UseFetchUsers;
