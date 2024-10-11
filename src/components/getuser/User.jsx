import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./user.css";
import toast from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://crud-backend-nu.vercel.app/api/getall");
      setUsers(response.data);
    };
    fetchData();
  }, []);

  const deleteUser =async(userId)=>{
        await axios.delete(`https://crud-backend-nu.vercel.app/api/delete/${userId}`)
        .then((response)=>{
        setUsers((prevUser)=>prevUser.filter((user)=>user._id !==userId));
        toast.success(response.data.msg,{position:"top-right"});
        })
        .catch((error)=>{
          console.log(error);
        })
  }

  return (
    <div className="userTable">
      <Link to={"/add"} className="addButton">
        Add User
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index+1}.</td>
                <td>{user.fname} {user.lname}</td>
                <td>{user.email}</td>
                <td className="actionButtons">
                  <button onClick={()=>deleteUser(user._id)}>Delete</button>
                  <Link to={`/edit/`+ user._id}>Edit</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
