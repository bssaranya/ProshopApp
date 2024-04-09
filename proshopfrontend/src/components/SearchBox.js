import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom';


function SearchBox() {
    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate();
    const location = useLocation();

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            // history.push(`/?keyword=${keyword}&page=1`)
            navigate(`/?keyword=${keyword}&page=1`)
        } else {
            // history.push(history.push(history.location.pathname))
            navigate(navigate(location.pathname))
        }
    }
    return (
        <Form onSubmit={submitHandler} className="d-flex">
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search Products..."
                className='mr-sm-2 ml-sm-5'
                style={{
                    color: 'black',
                    opacity: '1',
                    WebkitTextFillColor: 'black', // For Webkit browsers
                    MozTextFillColor: 'black',    // For Firefox
                    '::placeholder': { color: 'black', opacity: '1' } // Set placeholder text color
                }}
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='p-2'
            >
                Submit
            </Button>
        </Form>
    )
}

export default SearchBox