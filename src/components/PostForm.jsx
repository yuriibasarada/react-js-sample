import React, {useState} from 'react';
import Input from "./UI/Input/Input";
import Button from "./UI/Button/Button";

const PostForm = ({create}) => {

  const defaultPost = {title: '', body: ''}

  const [post, setPost] = useState(defaultPost)


  const addNewPost = (e) => {
    e.preventDefault()
    const newPost = {...post, id: Date.now()};
    create(newPost)
    setPost(defaultPost)
  }


  return (
      <form>
        <Input
            type="text"
            placeholder='Post name'
            value={post.title}
            onChange={e => setPost({...post, title: e.target.value})}
        />
        <Input
            value={post.body}
            onChange={e => setPost({...post, body: e.target.value})}
            type="text"
            placeholder='Post description'
        />
        <Button onClick={addNewPost}>Create Post</Button>
      </form>
  );
};

export default PostForm;