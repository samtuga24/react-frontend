import React, { useEffect, useState } from 'react'
import { faXmark, faTrash, faPenToSquare, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
export const ViewUsers = () => {
    const [edit, setEdit] = useState(false);
    const [main, setMain] = useState(true);
    const [view, setView] = useState([])
    const [userEdit, setUserEdit] = useState({});
    const user = JSON.stringify(userEdit, null, 2)
    const userFinal = JSON.parse(user)
    const diaryView = JSON.stringify(view, null, 2)
    const setDiary = JSON.parse(diaryView)
    const VIEW_USERS_API_URL = "https://phma-rmu.herokuapp.com/view-users"

    const [role, setRole] = useState({
        name: "",
    });

    const onUpdateRole = e => {
        const newFormState = {
            ...role,
            [e.target.name]: e.target.value
        };
        setRole(newFormState);
    }

    const finalSubmit = { ...userEdit, roles: [role] }
    const finalUpdate = JSON.stringify(finalSubmit, null, 2)


    const submitForm = (email) => {
        const checkRole = role.name;
        let roleLength;

        if (checkRole.length<1) {
            roleLength = false;
            // alert("Please Select Role")
        } else {
            roleLength = true;
        }

        if (roleLength) {
            axios.patch(`https://phma-rmu.herokuapp.com/update-user/${email}`, finalUpdate, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                alert(response.data.body)
            })
        }
    }

    useEffect(() => {
        axios.get(VIEW_USERS_API_URL)
            .then(response => {
                setView(response.data, null, 2);

            })
    }, []);

    const deleteUser = (id) => {
        axios.delete(`https://phma-rmu.herokuapp.com/remove/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }

        }).then((response)=>{
            alert(response.data.body)
        })
        // setAuthorize(true);
    }

    const onEdit = (editDetails) => {
        setEdit(true)
        setMain(false)
        setUserEdit(editDetails);
    }

    const backView = () => {
        setEdit(false);
        setMain(true)
    }




    return (
        <div className='outgoing-wrapper'>

            {main &&
                <div className='view-outgoing'>
                    <div className='view-table'>
                        <table className='table-width'>
                            <tr>
                                <th>First Name</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Action</th>

                            </tr>
                            {setDiary.map((user) => {
                                return (
                                    <tr key={user.userId}>
                                        <td className='table-data'>{user.firstName}</td>
                                        <td className='table-data'>{user.email}</td>
                                        <td className='table-data'>{user.roles[0].name}</td>
                                        <td className='table-data remove-row'>
                                            <div className='edit-div'>
                                                <FontAwesomeIcon icon={faPenToSquare} size='lg' className='edit-user' onClick={() => onEdit(user)} />
                                            </div>
                                            {/* <div className='edit-div' onClick={() => deleteUser(user.userId)}>
                                                <FontAwesomeIcon icon={faTrash} size='lg' className='remove-user' />
                                            </div> */}
                                        </td>

                                    </tr>

                                );
                            })}

                        </table>

                    </div>
                </div>
            }

            {edit &&
                <div className='update'>
                    <div className='update-back-icon'>
                        <div className='edit-div'>
                            <FontAwesomeIcon icon={faAngleLeft} size='2x' className='angle-left' onClick={backView} />
                            <div className='back-text' onClick={backView}>Back</div>

                        </div>
                    </div>
                    <div className='update-form'>
                        <div className='incoming-header'>
                            <h4>Update User Role</h4>
                        </div>
                        <div className='login-form'>
                            <div className='login-form-input'>
                                <input type="text" value={userFinal.firstName} className='login-input' />
                            </div>
                            <div className='login-form-input'>
                                <input type="text" value={userEdit.email} className='login-input' />
                            </div>
                            <select name="name" value={role.role} onChange={onUpdateRole} className='select-login-input'>
                                <option value="" disabled selected>--Select Role</option>
                                <option value="admin">admin</option>
                                <option value="user">user</option>
                                <option value="inactive" className='deactivate'>deactivate</option>
                            </select>

                            <div className='login-submit' onClick={submitForm(userFinal.email)}>Update User</div>

                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
