import React, { useState, useEffect } from "react";
import Results from "./Results";
import PropTypes from "prop-types";
import { searchWord } from "../services/api";
import "../styles/Dictionary.css";

const Dictionary = ({ defaultKeyword }) => {
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const search = async (searchKeyword) => {
    try {
      setIsSearching(true);
      setError(null);

      // Tìm kiếm từ trong từ điển local
      const wordData = await searchWord(searchKeyword);
      setResults(wordData);
    } catch (err) {
      console.error("Error:", err);
      setError("Không tìm thấy từ này trong từ điển");
      setResults(null);
    } finally {
      setIsSearching(false);
    }
  };

  // Tìm kiếm lần đầu khi component mount
  useEffect(() => {
    search(defaultKeyword);
  }, [defaultKeyword]);

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    search(keyword);
  };

  return (
    <div className="Dictionary">
      <section>
        <div className="subheading">Bạn muốn tìm từ gì?</div>
        <form onSubmit={handleSubmit}>
          <input
            className="search"
            type="search"
            name="keyword"
            onChange={handleKeywordChange}
            value={keyword}
            placeholder="Nhập từ cần tìm..."
          />
          <input 
            type="submit" 
            value={isSearching ? "Đang tìm..." : "Tìm kiếm"} 
            className="search-button"
            disabled={isSearching}
          />
        </form>
        <div className="suggestions">
          Gợi ý: hello, book, code, sun...
        </div>
      </section>
      {error && <div className="error-message">{error}</div>}
      {results && <Results results={results} />}
    </div>
  );
};

Dictionary.propTypes = {
  defaultKeyword: PropTypes.string.isRequired,
};

export default Dictionary;
