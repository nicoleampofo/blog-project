import {useState} from 'react';
// axios is similar to fetch, which is a browser API
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

/* When the form is submitted, the application needs to re-route to the home page, and that the request is sent to the correct API controller to get to the database (via server.js) */

// create component
const NewPostPage = () => {

    // post is the data that the user has entered. It will be sent to the API.
    // setPost is the default function that runs each time a user starts typing and will fill in the state variable for author or image or whatever.
    // the deafult state of the variable is '' and it will be updated each time setPost is called.
  const [post, setPost] = useState({
    title: '',
    author: '',
    image: '',
    content: ''
  });

  // allows users to navigate between different routes
    const navigate = useNavigate();

  // when someone presses a key, update state to show what they are typing into a field
    const handleChange = e => {
      // the spread operator (...) takes all the data that is already in the form. This is so that the entire form isn't overwritten.
      // target: the field that the user is writing into. We do not have to keep track of which field, e has that information
      setPost({...post, [e.target.name]: e.target.value })
    }
    // sends data to the database. corresponds to app.post/posts in server.js
    // e is the event; click event here
    const handleSubmit = async e => {
        e.preventDefault();
        await axios.post('http://localhost:5500/posts', post)
        navigate('/')
    }

    // add Bootstrap that works with React
    return(
      <Container className= 'mt-4'>

        {/* adds custom behavior to form when form is submitted */}
        <Form onSubmit = {handleSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            {/* every time a key is typed, handleChange() is run */}
            <Form.Control type="text" name="title" placeholder='Title' onChange={handleChange}/>
          </Form.Group>

          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" name="author" placeholder='Author' onChange={handleChange}/>
          </Form.Group>

          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="image" name="Inage URL" placeholder='Title' onChange={handleChange}/>
          </Form.Group>

          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control type="textarea" rows={3} name="content" placeholder='Content' onChange={handleChange}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit New Post
          </Button>

        </Form>

      </Container>
    )
};

export default NewPostPage;