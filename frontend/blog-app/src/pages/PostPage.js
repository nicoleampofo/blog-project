import {useEffect, useState} from 'react';
// axios is similar to fetch, which is a browser API
import axios from 'axios';
import {useParams } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';

const PostPage = () => {
  const [post, setPost] = useState({
    title: '',
    author: '',
    image: '',
    content: ''
  })

  const {id} = useParams

}