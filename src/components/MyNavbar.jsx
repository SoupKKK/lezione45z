import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, logoutUser } from '../redux/actions';
import { setIsAuthenticated } from '../redux/actions';
import userEvent from '@testing-library/user-event';

function MyNavbar() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleAddUser = () => {
        const newUser = {
            username: username,
            password: password,
        };


        dispatch(addUser(newUser));

        dispatch(setIsAuthenticated(true));

    };



    const handleLogout = () => {
        dispatch(logoutUser());
    };



    return (
        <Navbar className="bg-body-tertiary justify-content-between p-3">
            <Link to="/search">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
            </Link>
            {isAuthenticated ? (
                <div>
                    <div>
                        <Link to="/FavouriteSongs">
                            <Button>
                                Brani Preferiti
                            </Button>
                        </Link>
                    </div>
                    <Button variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            ) : (
                <Form>
                    <Row>
                        <Col xs="auto">
                            <InputGroup>
                                <InputGroup.Text id="basic-addon1">login:</InputGroup.Text>
                                <Form.Control
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />

                                <Form.Control
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="basic-addon1"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs="auto">
                            <Button type="submit" onClick={handleAddUser}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            )}
        </Navbar>
    );
}


export default MyNavbar;
