import React, { useRef, useState } from "react";
import { useEffect } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

function App() {
  const [error, setError] = useState();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const abortControllerRef = useRef(null); 

  useEffect(() => {
    const fetchPosts = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController(); 

      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/posts?_page=${page}&_limit=10`, {
          signal: abortControllerRef.current?.signal,
        });
        const posts = await response.json();
        setPosts(posts);
      } catch (e) {
        if (e.name === 'AbortError') {

          return;
        }
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [page]);

  if (error) {
    return <div>something went wrong! please try Again</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Data Fetching In React</h1>
      <button 
        onClick={() => setPage(page + 1)} 
        className="bg-red-400 p-2 border font-bold rounded"
      >
        increase page ({page})
      </button>
      {isLoading && <div>loading...</div>}
      {!isLoading && (
        <ul>
          {posts.map((post) => {
            return <li key={post.id}>{post.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
}

export default App;