import { createRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import APICall from "../API/APICall";

export default function Login(props) {
  const email = createRef();
  const password = createRef();
  const [cookies, setCookie] = useCookies(["token"]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await APICall.callApi(`login`, {}, "post", {
      email: email.current.value,
      password: password.current.value,
    })
      .then((response) => {
        const token = response.data.message.token;
        setCookie("token", token, {
          path: "*",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (cookies.token) {
    return <Navigate to="/dashboard" replace={true} />;
  }
  return (
    <Modal show={true} centered={true}>
      <Modal.Header>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={email} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={password}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
