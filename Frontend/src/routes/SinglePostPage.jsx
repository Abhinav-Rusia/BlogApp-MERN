import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import Comments from "../components/Comments";
import { getPostBySlug } from "../services/api";

const SinglePostPage = ({ user }) => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const hasIncrementedView = useRef(false);

  useEffect(() => {
    // Reset the view increment flag when slug changes
    hasIncrementedView.current = false;
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    // Only increment view if we haven't already done so for this post
    const shouldIncrementView = !hasIncrementedView.current;

    const result = await getPostBySlug(slug, shouldIncrementView);

    if (result.success) {
      setPost(result.data);
      // Mark that we've incremented the view for this post
      hasIncrementedView.current = true;
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <div className="text-lg text-gray-600">Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <div className="text-red-600">{error || "Post not found"}</div>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {post.title}
        </h1>

        <div className="text-gray-600 text-sm mb-4">
          <span>By </span>
          <span className="font-medium">{post.user.name || 'Unknown Author'}</span>
          <span className="mx-2">•</span>
          <span className="capitalize">{post.category}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(post.createdAt)}</span>
          <span className="mx-2">•</span>
          <span>{post.visit} views</span>
        </div>

        {post.desc && (
          <p className="text-gray-700 text-lg mb-6">
            {post.desc}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="mb-6">
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm mr-2">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {post.img && (
          <div className="mb-8">
            <img
              src={post.img}
              className="rounded w-full h-64 md:h-96 object-cover"
              alt={post.title}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-12">
        <div
          className="text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* Comments Section */}
      <Comments postId={post._id} user={user} />
    </div>
  );
};

export default SinglePostPage;
