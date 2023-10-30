import React, { useState } from "react";
import EditUserPage from "./EditUserPage";

function ProfilePage() {
  const [editUser, setEditUser] = useState(false);
  const toggleEditUser = () => {
    setEditUser((editUser) => !editUser);
  };
  return (
    <>
      <button onClick={() => toggleEditUser()}>Redigera</button>
      {editUser && <EditUserPage {...{ setEditUser }} />}
    </>
  );
}

export default ProfilePage;
