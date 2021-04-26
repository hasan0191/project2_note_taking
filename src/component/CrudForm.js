import React, { useState } from "react";
import firebase from "../firebase/firebase";

function CrudForm() {
  const [data, setData] = useState({ sname: "" });
  let [error, setError] = useState("");

  const onCangHand = (e) => {
    // console.log('func paice...')
    setData(() => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSub = (e) => {
    e.preventDefault();
    // console.log(data)
    // console.log(data);
    if (data.sname === "") {
      console.log("nothing");
      setError("Value required.");
      return;
    }
    const studentRef = firebase.database().ref("Student");
    const student = {
      sname: data.sname,
    };
    studentRef.push(student);
    setData({ sname: "" });
    setError("");
  };

  return (
    <div className="middle">
        
        <form action="" onSubmit={onSub}>
          <br />
          <label htmlFor="">My Note: </label>
          <br />
          <textarea
            rows="5"
            cols="50"
            type="text"
            name="sname"
            value={data.sname}
            onChange={onCangHand}
          />
          <br />
          <button>Submit</button>
        </form>
        <p style={{ color: "red" }}>{error}</p>
       
    </div>
  );
}

export default CrudForm;
