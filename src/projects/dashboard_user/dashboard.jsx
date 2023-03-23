import React, { useState, useRef } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { nanoid } from 'nanoid';

const Dashboard = () => {
  const [allUser, setallUser] = useState([
    {
      id: 0,
      user: 'john',
      email: 'john77@gmail.com',
      contact: '+55 88 99 77',
      company: 'almazon',
      city: 'new york',
    },
    {
      id: 1,
      user: 'johnny lever',
      email: 'john77@gmail.com',
      contact: '+55 88 99 77',
      company: 'almazon',
      city: 'new york',
    },
    {
      id: 2,
      user: 'rock',
      email: 'john77@gmail.com',
      contact: '+55 88 99 77',
      company: 'almazon',
      city: 'new york',
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  //const [formvalue, setFormValue] = useState('');
  const [isAdd, setIsAdd] = useState(false);
  //const [formImg, setFormImg] = useState('');
  //const[formaudio,setFormAudio]=useState("")
  const [idCounter, setIdCounter] = useState(2);
  const [addformvalue, setAddFormValue] = useState({
    id: '',
    user: '',
    email: '',
    contact: '',
    company: '',
    city: '',
  });

  const [clickedIndex, setClickedIndex] = useState();

  const submit = (song) => {
    let id = song.id;
    setClickedIndex(id);

    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => DeleteUser(id),
        },
        {
          label: 'Cancel',
          onClick: () => alert('Click No'),
        },
      ],
    });
  };
  const DeleteUser = async (id) => {
    console.log(clickedIndex);

    let result = allUser.filter((user) => user.id !== id);
    setallUser(result);
  };
  const editToggle = () => {
    setIsOpen(!isOpen);
  };

  const editAddToggle = () => {
    setIsAdd(!isAdd);
  };

  const [editValue, setEditValue] = useState({
    id: '',
    user: '',
    email: '',
    contact: '',
    company: '',
    city: '',
  });
  const editreToggle = (song) => {
    setClickedIndex(song.id);

    setEditValue({
      id: song.id,
      user: song.user,
      email: song.email,
      contact: song.contact,
      company: song.company,
      city: song.city,
    });
    setIsOpen(!isOpen);
  };
  console.log(clickedIndex);

  const getAllSongs = () => {};

  const getAllSongsData = () => {};

  // edit
  const handleChangeData = async (e) => {
    setEditValue({
      ...editValue,
      [e.target.name]: e.target.value,
    });
    // setAddFormValue({
    //   ...addformvalue,

    //   [event.target.name]: event.target.value,
    // });
    console.log(addformvalue);
  };

  const editsubmit = async (event) => {
    event.preventDefault();

    const index = allUser.findIndex((user) => user.id === clickedIndex);
    const newUserList = [...allUser];
    newUserList[index] = editValue;
    setallUser(newUserList);
    editToggle();
  };

  const AddAlbumName = async (event) => {
    event.preventDefault();

    const contact = {
      id: nanoid(),
      user: addformvalue.user,
      email: addformvalue.email,
      contact: addformvalue.contact,
      company: addformvalue.company,
      city: addformvalue.city,
    };

    setallUser([...allUser, contact]);
    editAddToggle();
    // setIdCounter((prev) => prev + 1);
  };
  console.log(allUser);
  console.log(idCounter);

  const handleChange = (e) => {
    setAddFormValue({ ...addformvalue, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className='companysec'>
        <div className='dashsec'>
          <div className='buttonsarea'>
            <div className='addalbumarea'>
              <button className='addalbum' onClick={editAddToggle}>
                add new user
              </button>
            </div>
          </div>
          <div className='crud'>
            <table className='crudTable'>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Company</th>
                  <th>City</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allUser?.map((song) => (
                  <tr>
                    <td>{song.user}</td>
                    <td>{song.email}</td>
                    <td>{song.contact}</td>
                    <td>{song.company}</td>
                    <td>{song.city}</td>
                    <td>
                      {' '}
                      <button
                        className='edelbtn edit'
                        onClick={() => editreToggle(song)}
                      >
                        Edit
                      </button>
                      <button className='edelbtn' onClick={() => submit(song)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {isOpen && (
          <div className='box'>
            <div className='popup-box'>
              <span className='close-icon' onClick={editToggle}>
                x
              </span>
              <div className='editformarea'>
                <form className='albumeditfm'>
                  <div className='form-group'>
                    <div className='lablearea'>
                      <label>User </label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        type='text'
                        className='catename'
                        onChange={(e) => handleChangeData(e)}
                        value={editValue.user}
                        name='user'
                      />
                    </div>
                  </div>

                  <div className='form-group'>
                    <div className='lablearea'>
                      <label>Email </label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        type='text'
                        className='catename'
                        onChange={(e) => handleChangeData(e)}
                        value={editValue?.email}
                        name='email'
                      />
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='lablearea'>
                      <label>Contact </label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        type='text'
                        className='catename'
                        onChange={(e) => handleChangeData(e)}
                        value={editValue?.contact}
                        name='contact'
                      />
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='lablearea'>
                      <label>Company </label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        type='text'
                        className='catename'
                        onChange={(e) => handleChangeData(e)}
                        value={editValue.company}
                        name='company'
                      />
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='lablearea'>
                      <label>City </label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        type='text'
                        className='catename'
                        onChange={(e) => handleChangeData(e)}
                        value={editValue?.city}
                        name='city'
                      />
                    </div>
                  </div>

                  <button className='submitbtn' onClick={(e) => editsubmit(e)}>
                    submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        {isAdd && (
          <div className='box'>
            <div className='popup-box'>
              <span className='close-icon' onClick={editAddToggle}>
                x
              </span>
              <div className='editformarea'>
                <form className='albumeditfm'>
                  <div className='form-group'>
                    <div className='lablearea'>
                      <label>User </label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        type='text'
                        className='catename'
                        onChange={(e) => handleChange(e)}
                        name='user'
                      />
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='lablearea'>
                      <label>email </label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        type='text'
                        className='catename'
                        onChange={(e) => handleChange(e)}
                        name='email'
                      />
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='lablearea'>
                      <label>Contact </label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        type='text'
                        className='catename'
                        onChange={(e) => handleChange(e)}
                        name='contact'
                      />
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='lablearea'>
                      <label>Company </label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        type='text'
                        className='catename'
                        onChange={(e) => handleChange(e)}
                        name='company'
                      />
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='lablearea'>
                      <label>City </label>
                    </div>
                    <div className='inputarea'>
                      {' '}
                      <input
                        type='text'
                        className='catename'
                        onChange={(e) => handleChange(e)}
                        name='city'
                      />
                    </div>
                  </div>

                  <button
                    className='submitbtn'
                    onClick={(e) => AddAlbumName(e)}
                  >
                    submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
