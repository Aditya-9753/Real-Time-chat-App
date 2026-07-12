/**
 * @file SearchUser.jsx
 * @description Search input for filtering users in the sidebar.
 */

const SearchUser = ({ value, onChange }) => (
  <div className="search-container">
    <div className="search-input-wrapper">
      <svg
        className="search-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        type="search"
        className="search-input"
        placeholder="Search users..."
        value={value}
        onChange={onChange}
        aria-label="Search users"
        id="user-search-input"
      />
    </div>
  </div>
);

export default SearchUser;
