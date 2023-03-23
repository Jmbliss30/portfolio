import React, { useState, useRef } from 'react';
import './contact.css';

import { send } from 'emailjs-com';

const Contact = ({ contactRef }) => {
  const form = useRef();
  const [formValues, setFormValues] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [toSend, setToSend] = useState({
    from_name: '',
    to_name: '',
    message: '',
    reply_to: '',
  });

  const formhandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    send('service_r9o4zjt', 'template_jw7csya', formValues, 'zrVCvxFff1fYNV_3I')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      })
      .catch((err) => {
        console.log('FAILED...', err);
      });
    alert('form submitted');

    console.log(formValues);
    setFormValues({
      name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
    });
  };
  return (
    <div className='contact-page' ref={contactRef}>
      <div class='wrapper'>
        <div class='company-info'>
          <ul className='details'>
            <li className='detail-item'>
              <i class='fa fa-road'></i> Indore, India
            </li>
            <li className='detail-item'>
              <i class='fa fa-phone'></i> +91 8871336354
            </li>
            <li className='detail-item'>
              <i class='fa fa-envelope'></i> mohithasija77@gmail.com
            </li>
          </ul>
        </div>

        <div class='contact'>
          <h3 className='contact-title'>Contact Me</h3>

          <form
            id='contact-form'
            onSubmit={(e) => submitForm(e)}
            key={Math.random}
            action='mailto:mohithasija77@gmail.com'
            method='post'
          >
            <p>
              <label>Name</label>
              <input
                type='text'
                name='name'
                value={formValues.name}
                id='name'
                required
                onChange={(e) => formhandler(e)}
              />
            </p>

            <p>
              <label>Company</label>
              <input
                type='text'
                name='company'
                value={formValues.company}
                id='company'
                onChange={(e) => formhandler(e)}
              />
            </p>

            <p>
              <label>E-mail Address</label>
              <input
                type='email'
                name='email'
                value={formValues.email}
                id='email'
                required
                onChange={(e) => formhandler(e)}
              />
            </p>

            <p>
              <label>Phone Number</label>
              <input
                type='text'
                name='phone'
                value={formValues.phone}
                id='phone'
                onChange={(e) => formhandler(e)}
              />
            </p>

            <p class='full'>
              <label>Message</label>
              <textarea
                name='message'
                value={formValues.message}
                rows='5'
                id='message'
                onChange={(e) => formhandler(e)}
              ></textarea>
            </p>

            <p class='full'>
              <button type='submit'>Submit</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Contact;
