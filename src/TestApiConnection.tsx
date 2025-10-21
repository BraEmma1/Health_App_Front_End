import React, { useEffect, useState } from 'react';
import { apiService } from './services/api';

const TestApiConnection: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getPosts()
      .then((response) => {
        setPosts(response.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message || 'API error');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <h2>Posts from API:</h2>
      <ul>
        {posts.length === 0 ? <li>No posts found.</li> :
          posts.map((post, i) => (
            <li key={i}>{JSON.stringify(post)}</li>
          ))}
      </ul>
    </div>
  );
};

export default TestApiConnection;
