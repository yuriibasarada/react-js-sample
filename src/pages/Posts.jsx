import React, {useEffect, useMemo, useRef, useState} from "react";
import '../styles/App.css'
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/UI/PostFilter";
import Modal from "../components/UI/Modal/Modal";
import Button from "../components/UI/Button/Button";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import Pagination from "../components/UI/Pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import Select from "../components/UI/Select/Select";

function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)


  const lastElement = useRef()

  const sortedSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const [fetchPosts, isPostsLoading, postsError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page)
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1)
  })

  const changePage = page => {
    setPage(page)
  }

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])

  const createPost = post => {
    setPosts([...posts, post])
    setModal(false)
  }
  const removePost = post => setPosts(posts.filter(p => p.id !== post.id))

  return (
      <div className="App">
        <Button style={{marginTop: '30px'}} onClick={() => setModal(true)}>Create Post</Button>
        <Modal visible={modal} setVisible={setModal}>
          <PostForm create={createPost}/>
        </Modal>
        <hr style={{margin: '15px 0'}}/>
        <PostFilter filter={filter} setFilter={setFilter} />
        <Select
          value={limit}
          onChange={setLimit}
          defaultValue='Count of elements'
          options={[
            {value: 5, name: '5'},
            {value: 10, name: '10'},
            {value: 25, name: '25'},
            {value: -1, name: 'All'},
          ]}
        />
        {postsError &&
            <h1>Server error... {postsError}</h1>
        }
        {isPostsLoading &&
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /></div>
        }
        <PostList remove={removePost} posts={sortedSearchedPosts} title={'JavaScript Post List'}/>
        <div ref={lastElement} style={{height: '20px', background: 'red'}} />
        <Pagination
            page={page}
            totalPages={totalPages}
            changePage={changePage}
        />
      </div>
  );
}

export default Posts;
