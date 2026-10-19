import React from "react";
import UserNav from "./UserNav";
import UserCard from "./UserCard";
import { useState } from "react";

const User = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <UserNav search={search} setSearch={setSearch} />
      <UserCard search={search} />
    </>
  );
};

export default User;
