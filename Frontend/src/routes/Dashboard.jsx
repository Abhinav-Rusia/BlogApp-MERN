import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPosts, deletePost } from "../services/api";

const Dashboard = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    const result = await getAllPosts();
    
    if (result.success) {
      // Filter posts by current user
      const userPosts = result.data.filter(post => post.user._id === user._id);
      setPosts(userPosts);
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const result = await deletePost(postId);
      
      if (result.success) {
        setPosts(posts.filter(post => post._id !== postId));
      } else {
        alert('Failed to delete post');
      }
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to access the dashboard</p>
          <Link to="/login" className="bg-blue-800 text-white px-6 py-2 rounded-lg">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-forest-green">Loading your posts...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Dashboard</h1>
        <p className="text-gray-600 mb-4">Welcome back, {user.name}!</p>
        <Link
          to="/write"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Write New Post
        </Link>
      </div>

      {/* Simple Stats */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Your Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-gray-300 p-3 text-center">
            <div className="text-xl font-bold text-gray-800">{posts.length}</div>
            <div className="text-sm text-gray-600">Total Posts</div>
          </div>

          <div className="border border-gray-300 p-3 text-center">
            <div className="text-xl font-bold text-gray-800">{posts.reduce((sum, post) => sum + (post.visit || 0), 0)}</div>
            <div className="text-sm text-gray-600">Total Views</div>
          </div>

          <div className="border border-gray-300 p-3 text-center">
            <div className="text-xl font-bold text-gray-800">{new Set(posts.map(post => post.category)).size}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>

          <div className="border border-gray-300 p-3 text-center">
            <div className="text-xl font-bold text-gray-800">
              {posts.filter(post => {
                const postDate = new Date(post.createdAt);
                const now = new Date();
                return postDate.getMonth() === now.getMonth() && postDate.getFullYear() === now.getFullYear();
              }).length}
            </div>
            <div className="text-sm text-gray-600">This Month</div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Posts Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Posts ({posts.length})</h2>

        {posts.length === 0 ? (
          <div className="text-center py-8 border border-gray-300 rounded">
            <h3 className="text-lg font-bold text-gray-800 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-4">You haven't written any posts yet. Start sharing your thoughts!</p>
            <Link
              to="/write"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Write Your First Post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post._id} className="border border-gray-300 p-4">
                {/* Post Image */}
                {post.img && (
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-32 object-cover mb-3"
                  />
                )}

                {/* Post Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  <Link to={`/${post.slug}`} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h3>

                {/* Post Description */}
                {post.desc && (
                  <p className="text-gray-700 mb-3">{post.desc}</p>
                )}

                {/* Post Info */}
                <div className="text-sm text-gray-600 mb-3">
                  <span className="bg-gray-200 px-2 py-1 text-xs mr-2">{post.category}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{post.visit || 0} views</span>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mb-3">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 text-xs mr-1">
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-gray-500 text-xs">+{post.tags.length - 3} more</span>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    to={`/edit/${post._id}`}
                    className="bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-600 text-white px-4 py-2 text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
