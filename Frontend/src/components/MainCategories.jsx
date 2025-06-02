import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MainCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Get current category from URL
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category');

  const categories = [
    { name: 'All Posts', path: '/posts', key: null },
    { name: 'Web Design', path: '/posts?category=web-design', key: 'web-design' },
    { name: 'Development', path: '/posts?category=development', key: 'development' },
    { name: 'Technology', path: '/posts?category=technology', key: 'technology' },
    { name: 'Tutorial', path: '/posts?category=tutorial', key: 'tutorial' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/posts?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const isActive = (categoryKey) => {
    if (categoryKey === null) {
      return !currentCategory && !searchParams.get('search');
    }
    return currentCategory === categoryKey;
  };

  return (
    <div className="bg-white border border-gray-300 rounded p-4 mb-6">
      {/* Search */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>

      {/* Category Links */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.path}
            className={`px-3 py-2 rounded text-sm ${
              isActive(category.key)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default MainCategories;
