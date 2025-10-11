import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    author: '',
    image: '',
    content: ''
  });
  const [error, setError] = useState(null);

  // fetch data from the backend (server.js)
  useEffect(() => {
    fetch(`http://localhost:5500/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          title: data.title || '',
          author: data.author || '',
          image: data.image || '',
          content: data.content || ''
        });
      })
      .catch(err => {
        console.log('Failed to load post');
      });
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // upon submit, send data back to the server.js, at the edit route
  const handleSubmit = async e => {
    e.preventDefault();
    try {
  const res = await fetch(`http://localhost:5500/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        navigate(`/posts/${id}`);
      }
    } catch (err) {
      setError('Failed to update post');
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <Container className= 'mt-4'>
      <h2>Edit This Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={form.title} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" name="author" value={form.author} onChange={handleChange} required/>
          </Form.Group>
        <Form.Group>
            <Form.Label>Image URL (Must begin with "http")</Form.Label>
            <Form.Control type="text" name="image" value={form.image} onChange={handleChange}
            required/>
          </Form.Group>
        <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={3} name="content" value={form.content} onChange={handleChange} required/>
          </Form.Group>
        <Button
            variant="primary"
            type="submit"
        >
            Update Post
        </Button>
      </Form>
    </Container>
  );
};

export default EditPostPage;
