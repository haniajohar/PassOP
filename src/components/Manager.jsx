import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faEye, faEyeSlash, faCopy, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const savedPasswords = localStorage.getItem("passwords");
        if (savedPasswords) {
            setPasswordArray(JSON.parse(savedPasswords));
        }
    }, []);

    const showPassword = () => {
        setIsPasswordVisible(prev => !prev);
    };

    const savePassword = () => {
        if (!form.site || !form.username || !form.password) {
            toast.error("Please fill in all fields");
            return;
        }

        if (isEditing) {
            const filteredArray = passwordArray.filter(item => item.id !== editingId);
            const updatedEntry = { ...form, id: editingId };
            const updatedArray = [...filteredArray, updatedEntry];

            setPasswordArray(updatedArray);
            localStorage.setItem("passwords", JSON.stringify(updatedArray));

            toast.success("Password updated!");
            setIsEditing(false);
            setEditingId(null);
        } else {
            const newEntry = { ...form, id: uuidv4() };
            const newArray = [...passwordArray, newEntry];
            setPasswordArray(newArray);
            localStorage.setItem("passwords", JSON.stringify(newArray));
            toast.success("Password saved!");
        }

        setForm({ site: "", username: "", password: "" });
    };

    const deletePassword = (id) => {
        if (confirm("Do you really want to delete this password?")) {
            const newPasswordArray = passwordArray.filter(item => item.id !== id);
            setPasswordArray(newPasswordArray);
            localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
        }
    };

    const editPassword = (id) => {
        const entry = passwordArray.find(item => item.id === id);
        if (entry) {
            setForm({
                site: entry.site,
                username: entry.username,
                password: entry.password
            });
            setIsEditing(true);
            setEditingId(id);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className='absolute bg-green-50 inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'>
                <div className='absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full opacity-20 blur-[100px]'></div>
            </div>

            <div className="container px-4 sm:px-10 py-10 sm:py-16 mx-auto max-w-full">
                <h1 className='text-3xl sm:text-4xl text-center font-bold'>
                    <span className="text-green-500">&lt;</span>
                    Pass
                    <span className="text-green-500">OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-center text-base sm:text-lg'>Your own password manager</p>

                <div className="flex flex-col gap-4 sm:gap-8 items-center w-full p-4">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        name='site'
                        placeholder='Enter website URL'
                        className="rounded-full border border-green-500 w-full p-2"
                        type="text"
                    />

                    <div className="flex flex-col sm:flex-row w-full gap-4">
                        <input
                            value={form.username}
                            onChange={handleChange}
                            name='username'
                            placeholder='Enter Username'
                            className="flex-1 rounded-full border border-green-500 p-2"
                            type="text"
                        />

                        <div className="relative w-full sm:w-auto flex-1">
                            <input
                                value={form.password}
                                name='password'
                                onChange={handleChange}
                                placeholder='Enter Password'
                                className="w-full rounded-full border border-black p-2 pr-10"
                                type={isPasswordVisible ? "text" : "password"}
                            />
                            <span onClick={showPassword} className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'>
                                <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} className="text-black-500 w-5 h-5" />
                            </span>
                        </div>
                    </div>
                </div>

                <button onClick={savePassword} className="flex items-center justify-center gap-2 border border-green-900 bg-green-300 rounded-full px-4 py-2 mt-4 mx-auto hover:bg-green-400">
                    <FontAwesomeIcon icon={faFolderPlus} className="text-black-600" />
                    Save Password
                </button>

                <div className='passwords mt-10 overflow-x-auto'>
                    <h2 className='font-bold text-xl sm:text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 ? (
                        <div>No passwords to show</div>
                    ) : (
                        <table className="table-auto w-full text-sm sm:text-base rounded-md overflow-hidden">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2 px-1'>Website</th>
                                    <th className='py-2 px-1'>Username</th>
                                    <th className='py-2 px-1'>Password</th>
                                    <th className='py-2 px-1'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item) => (
                                    <tr key={item.id} className='text-center'>
                                        <td className='py-2 px-1'>
                                            <div className="flex justify-center items-center gap-2">
                                                <a href={item.site} target='_blank' rel="noopener noreferrer" className="truncate max-w-[100px]">{item.site}</a>
                                                <span
                                                    className="cursor-pointer text-black-600 hover:text-green-800"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(item.site);
                                                        toast.success("Copied site to clipboard");
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faCopy} />
                                                </span>
                                            </div>
                                        </td>
                                        <td className='py-2 px-1'>
                                            <div className="flex justify-center items-center gap-2">
                                                {item.username}
                                                <span
                                                    className="cursor-pointer text-black-600 hover:text-green-800"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(item.username);
                                                        toast.success("Copied username to clipboard");
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faCopy} />
                                                </span>
                                            </div>
                                        </td>
                                        <td className='py-2 px-1'>
                                            <div className="flex justify-center items-center gap-2">
                                                {item.password}
                                                <span
                                                    className="cursor-pointer text-black-600 hover:text-green-800"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(item.password);
                                                        toast.success("Copied password to clipboard");
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faCopy} />
                                                </span>
                                            </div>
                                        </td>
                                        <td className='py-2 px-1'>
                                            <span className='cursor-pointer text-black-600 hover:text-green-800' onClick={() => editPassword(item.id)}>
                                                <FontAwesomeIcon icon={faPen} />
                                            </span>
                                            <span className='cursor-pointer text-black-600 hover:text-red-800 ml-2' onClick={() => deletePassword(item.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default Manager;
