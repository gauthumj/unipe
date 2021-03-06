import React, { useEffect, useRef, useState } from "react";
import {
    collection,
    getDocs,
    updateDoc,
    doc,
    deleteDoc,
    onSnapshot,
} from "firebase/firestore";
import db from "./firebase-info";
import { Link } from "react-router-dom";

const View = () => {
    const [rows, setRows] = useState([]);
    const input = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const getData = async () => {
        try {
            const rows = (await getDocs(collection(db, "data"))).docs;
            const data = rows.map((row) => row.data());
            for (let i = 0; i < data.length; i++) {
                data[i].id = rows[i].id;
            }
            setRows(data);
        } catch (error) {
            console.log(error);
            alert(
                "Unable to get data from cloud. Please check your internet connection."
            );
        }
    };

    const handleNameChange = (e, index) => {
        const newRows = [...rows];
        newRows[index]["Name"] = e.target.value;
        console.log("newRows", newRows);
        setRows(newRows);
    };

    const handleAgeChange = (e, index) => {
        const newRows = [...rows];
        newRows[index]["Age"] = e.target.value;
        console.log("newRows", newRows);
        setRows(newRows);
    };

    const handleSexChange = async (e, index) => {
        const newRows = [...rows];
        newRows[index]["Sex"] = e.target.value;
        console.log("newRows", newRows[index]);
        setRows(newRows);
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "data"), () => {
            getData();
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="bg-gray-300 flex flex-col w-screen h-screen items-center justify-center">
            <div className="mt-5 w-1/3 relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Age
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Sex
                            </th>
                            <th scope="col" className=" sr-only">
                                delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows
                            ? rows.map((item, index) => (
                                  <tr
                                      key={item.id}
                                      className="bg-white border-b  hover:bg-gray-50 "
                                  >
                                      <td className="px-6 py-4">
                                          <input
                                              className="w-14 "
                                              disabled={disabled}
                                              type="text"
                                              value={item.Name}
                                              onChange={async (e) => {
                                                  handleNameChange(e, index);
                                                  await updateDoc(
                                                      doc(db, "data", item.id),
                                                      {
                                                          Name: item.Name,
                                                      }
                                                  );
                                              }}
                                          />
                                      </td>
                                      <td className="px-6 py-4">
                                          <input
                                              className="w-14 "
                                              disabled={disabled}
                                              ref={input}
                                              type="text"
                                              value={item.Age}
                                              onChange={async (e) => {
                                                  handleAgeChange(e, index);
                                                  await updateDoc(
                                                      doc(db, "data", item.id),
                                                      {
                                                          Age: item.Age,
                                                      }
                                                  );
                                              }}
                                          />
                                      </td>
                                      <td className="px-6 py-4">
                                          <input
                                              className="w-14 "
                                              disabled={disabled}
                                              ref={input}
                                              type="text"
                                              value={item.Sex}
                                              onChange={async (e) => {
                                                  handleSexChange(e, index);
                                                  await updateDoc(
                                                      doc(db, "data", item.id),
                                                      {
                                                          Sex: item.Sex,
                                                      }
                                                  );
                                              }}
                                          />
                                      </td>
                                      <td className="px-6 py-4">
                                          <button
                                              className="text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-1"
                                              onClick={async () => {
                                                  await deleteDoc(
                                                      doc(db, "data", item.id)
                                                  );
                                              }}
                                          >
                                              Delete
                                          </button>
                                      </td>
                                  </tr>
                              ))
                            : null}
                    </tbody>
                </table>
            </div>
            <div className=" space-x-5 justify-center items-center">
                <Link to="/">
                    <button
                        type="button"
                        className="mt-5 text-white bg-green-600 hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
                    >
                        Upload more!
                    </button>
                </Link>
                <button
                    onClick={() => setDisabled(!disabled)}
                    className="mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >
                    {disabled ? "Edit" : "Save"}
                </button>
            </div>
        </div>
    );
};

export default View;
