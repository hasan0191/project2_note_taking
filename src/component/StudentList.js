import React, { useEffect, useState } from "react";
import firebase from "../firebase/firebase";

function StudentList() {
  const [studentData, setStudentData] = useState([]);
  const [updateChang, setUpdateChang] = useState();

  useEffect(() => {
    const studentRef = firebase.database().ref("Student");

    studentRef.on("value", (wellcome) => {
      // console.log(wellcome.val());
      const students = wellcome.val();
      const studentArray = [];
      for (let id in students) {
        studentArray.push({ id, ...students[id], edit: false });
      }
      // console.log(studentArray)
      setStudentData(studentArray);
    });
  }, []);

  const onDel = (id) => {
    if (window.confirm("are you sure delete this?")) {
      const studentRef = firebase.database().ref("Student").child(id);
      studentRef.remove();
    } else {
      const studentRef = firebase.database().ref("Student").child(id);
    }
  };

  const onEdit = (id) => {
    let newArray = studentData.map((value) => {
      if (id === value.id) {
        // console.log(value);
        setUpdateChang(value);
        return { ...value, edit: true };
      } else {
        return { ...value, edit: false };
      }
    });

    // console.log(newArray)
    setStudentData(newArray);
  };

  const onChangUpdt = (e) => {
    if (updateChang) {
      setUpdateChang({ id: updateChang.id, sname: e.target.value });
    }
  };
  // console.log(updateChang)

  const updateData = (e) => {
    e.preventDefault();
    // console.log('data update')
    if (updateChang) {
      firebase
        .database()
        .ref("Student")
        .child(updateChang.id)
        .update({ sname: updateChang.sname });
    }

    setUpdateChang();
  };

  const closeBut = (e) => {
    e.preventDefault();
    const newArray = studentData.map((data) => {
      return { ...data, edit: false };
    });
    setStudentData(newArray);
  };

  return (
    <div>
      <h1>Note List</h1>
      {studentData.map((student, index) => {
        return (
          <div key={index}>
            {student.edit ? (
              <>
                <form action="" onSubmit={updateData}>
                  <textarea
                    type="text"
                    value={updateChang ? updateChang.sname : ""}
                    onChange={onChangUpdt}
                  />
                  <br />
                  <>
                    <button>update</button>
                  </>
                  <button onClick={closeBut}>close</button>
                </form>
              </>
            ) : (
              <div>
                <br />
                {student.sname}
                <p>
                  <button type="button" onClick={() => onEdit(student.id)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => onDel(student.id)}>
                    Delete
                  </button>
                </p>
              </div>
            )}
          </div>
        );
      })}
      {/* <EditStudent edit={edit} /> */}
      {/* {/* <pre>{JSON.stringify(studentData, null, 4)}</pre> */}
    </div>
  );
}

export default StudentList;
