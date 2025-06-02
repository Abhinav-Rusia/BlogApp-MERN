import { Link } from "react-router-dom";
import Image from "./Image";

const PostCard = ({ post, rank = null, showRank = false }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white border border-gray-300 rounded p-4 mb-4">
      {/* Image */}
      {post.img && (
        <div className="mb-4">
          <img
            src={post.img}
            alt={post.title}
            className="w-full h-48 object-cover rounded"
          />
          {/* Rank Badge */}
          {showRank && rank !== null && (
            <div className="mt-2">
              <span className={`text-white text-sm px-2 py-1 rounded ${
                rank === 1 ? 'bg-purple-600' : 'bg-blue-600'
              }`}>
                {rank === 1 ? '★ Featured' : `#${rank}`}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Title */}
      <Link to={`/${post.slug}`} className="block mb-2">
        <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600">
          {post.title}
        </h3>
      </Link>

      {/* Meta Info */}
      <div className="text-sm text-gray-600 mb-3">
        <span className="font-medium">{post.user.name || 'Unknown'}</span>
        <span className="mx-2">•</span>
        <span>{formatDate(post.createdAt)}</span>
        <span className="mx-2">•</span>
        <span>{post.visit || 0} views</span>
      </div>

      {/* Description */}
      {post.desc && (
        <p className="text-gray-700 text-sm mb-4">
          {post.desc}
        </p>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs mr-2">
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-gray-500 text-xs">+{post.tags.length - 3} more</span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center">
        <Link
          to={`/${post.slug}`}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          Read more →
        </Link>
        <span className="text-gray-600 capitalize text-xs bg-gray-100 px-2 py-1 rounded">
          {post.category}
        </span>
      </div>
    </div>
  );
};

export default PostCard;
