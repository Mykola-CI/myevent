import React from 'react';
import { getCurrentUser } from '@/utils/users';

const UserEmail = async () => {
  const user = await getCurrentUser();

  return (
    <div>
      {user?.email ? (
        <span>{user.email}</span>
      ) : (
        <span>No user signed in</span>
      )}
    </div>
  );
};

export default UserEmail;