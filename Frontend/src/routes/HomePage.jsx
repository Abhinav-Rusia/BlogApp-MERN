import { Link } from "react-router-dom";
import MainCategories from "../components/MainCategories";
import PostLists from "../components/PostLists";

const HomePage = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Simple Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Beyond Ink Blog
        </h1>
        <p className="text-gray-600 mb-6">
          Share your thoughts and read amazing articles from our community.
        </p>
      </div>

      {/* Categories */}
      <MainCategories />

      {/* Recent Posts */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Posts</h2>
        <PostLists />
      </div>
    </div>
  );
};

export default HomePage;