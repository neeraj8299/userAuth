import { Form } from "react-bootstrap";

export default function Forms(props) {
  const { userRowData,setFormData } = props;
  return (
    <Form>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={userRowData?.name}
          onChange={(e) => setFormData({ name: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={userRowData?.email}
          onChange={(e) => setFormData({ email: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ password: e.target.value })}
        />
      </Form.Group>
    </Form>
  );
}
