
const UserType = ({ user }) => {
    return (
      <div className="user-card">
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>UID: {user.uid}</p>
        {user.label && <p>Label: {user.label}</p>}
      </div>
    );
  };
  
  export default UserType;