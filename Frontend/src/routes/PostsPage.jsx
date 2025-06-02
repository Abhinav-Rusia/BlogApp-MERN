import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PostItems from "../components/PostItems";
import { getAllPosts } from "../services/api";

const PostsPage = ({ user }) => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  useEffect(() => {
    fetchPosts();
  }, [category, search]);

  const fetchPosts = async () => {
    setLoading(true);
    const result = await getAllPosts();
    
    if (result.success) {
      let filteredPosts = result.data;
      
      // Filter by category if specified
      if (category) {
        filteredPosts = filteredPosts.filter(post => 
          post.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      // Filter by search term if specified
      if (search) {
        filteredPosts = filteredPosts.filter(post =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.desc?.toLowerCase().includes(search.toLowerCase()) ||
          post.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
        );
      }
      
      setPosts(filteredPosts);
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const getCategoryTitle = () => {
    if (search) return `Search Results for "${search}"`;
    if (category) {
      return category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ') + ' Posts';
    }
    return 'All Posts';
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <div className="text-lg text-gray-600">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {getCategoryTitle()}
        </h1>

        {(category || search) && (
          <p className="text-gray-600">
            {posts.length} post{posts.length !== 1 ? 's' : ''} found
            {category && ` in ${category.replace('-', ' ')}`}
            {search && ` for "${search}"`}
          </p>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="text-center py-8">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No posts found
          </h3>
          <p className="text-gray-600">
            {category || search
              ? "Try adjusting your filters or search terms"
              : "No posts available at the moment"
            }
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostItems key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsPage;
