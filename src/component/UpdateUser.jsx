import React from 'react'

export const UpdateUser = () => {
  return (
    <div className='wrapper'>
    <div className='add-form'>
        <div className='login-form-input'>
            <input type="text" placeholder='First Name' name='firstName' className='login-input' />
        </div>
        <div className='login-form-input'>
            <input type="text" placeholder='username' className='login-input' />
        </div>
        <div className='login-form-input'>
            <input type="password" placeholder='password' className='login-input' />
        </div>

        <select className='select-login-input'>
            <option value="" disabled selected>--Select Role</option>
            <option value="admin">admin</option>
            <option value="user">user</option>
            <option value="deactivate">deactivate</option>
        </select>

        <div className='login-submit' onClick={submitForm}>Add User</div>

    </div>
</div>
  )
}
