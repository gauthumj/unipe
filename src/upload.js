import React, { useState } from "react";
import db from "./firebase-info.js";
import { addDoc, collection } from "firebase/firestore";
import { FileUploader } from "react-drag-drop-files";

const Upload = () => {
    const [file, setFile] = useState();
    const [array, setArray] = useState([]);

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                csvFileToArray(text);
            };

            fileReader.readAsText(file);
        }
    };

    const csvFileToArray = (string) => {
        const csvHeader = string
            .slice(0, string.indexOf("\n"))
            .trim()
            .split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

        const array = csvRows.map((i) => {
            const values = i.split(",");
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });

        setArray(array);
    };

    // const headerKeys = Object.keys(Object.assign({}, ...array));

    return (
        <div className="flex justify-center items-center flex-col">
            <div className="self-center">
                <h1 className=" font-mono mb-5 text-4xl font-bold">
                    Upload a file!
                </h1>
            </div>
            <div className="mb-3 w-96 ">
                <form>
                    <input
                        type="file"
                        className="block w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="exampleFormControlFile1"
                        accept=".csv"
                        onChange={handleOnChange}
                    />
                </form>
            </div>
            <label className="mb-2">Or</label>
            <div>
                <FileUploader
                    handleChange={(file) => {
                        setFile(file);
                    }}
                    style={{ width: "75%" }}
                    classes="h-12"
                    label="Upload a file"
                    name="file"
                    type={["csv"]}
                    maxSize={1}
                />
            </div>
            <button
                className="mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
                onClick={(e) => {
                    handleOnSubmit(e);
                    if (array.length > 0) {
                        array.forEach((item) => {
                            try {
                                if (item.Name) {
                                    addDoc(collection(db, "data"), item);
                                }
                            } catch (e) {
                                console.log(e);
                            }
                        });
                    }
                }}
            >
                Upload
            </button>
        </div>
    );
};

export default Upload;
