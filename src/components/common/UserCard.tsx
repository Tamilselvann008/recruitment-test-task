import React from "react";
import { User } from "../../interface";

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="bg-white shadow p-4 rounded-2xl flex gap-4 items-center">
      <img
        src={user.avatarUrl || "/placeholder.jpg"}
        alt={user.name}
        className="w-16 h-16 rounded-full"
      />
      <div>
        <h3 className="font-bold text-lg">{user.name}</h3>
        <p>{user.email}</p>
        <p className="text-sm text-gray-500">{user.role}</p>
      </div>
    </div>
  );
};

export default UserCard;
