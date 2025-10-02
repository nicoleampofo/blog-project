import {useEffect, useState} from 'react';
import {Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const HomePage = () => {
    // the default value for this state will be an empty array
    const [posts, setPosts] = useState([])

      useEffect(() => {
        const fetchPosts = async () => {
          try {
            const res = await fetch(`http://localhost:5500/posts`);
            const data = await res.json();
            setPosts(data);
          } catch (error) {
            console.log('Error: ', error)
          }
    };
      fetchPosts();
    }, []);

    const handleDelete = async(id) => {
        try {
          await fetch(`http://localhost:5500/posts/${id}`);
          setPosts(posts.filter((post) => post._id !== id));
        } catch (error) {
          console.log('Error', error)
        }
    }

    return (

    <Container>
      <Row>
        {posts.map((post) => (
          <Col md={4} className="mb-4, mt-4" key={post._id}>
            <Card style={{ width: '18rem'}}>
              <Card.Img
                variant="top"
                src={post.image}
                alt={post.title}
                style={{ height: '190px'}}
              />
              <Card.Body>
                {post.title.length<31 ? (
                  <Card.Title>{post.title}</Card.Title>
                ): (
                  <Card.Title>{post.title.slice(0, 31) + `...`}</Card.Title>
                )}

                <Card.Text maxLength={50}>
                  By: {post.author}
                </Card.Text>
                <Link to={`/posts/${post._id}`}>
                  <Button variant="primary" className="mr-2">Read More</Button>
                </Link>
                <Button variant="success" className="mr-2">Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(post._id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomePage;