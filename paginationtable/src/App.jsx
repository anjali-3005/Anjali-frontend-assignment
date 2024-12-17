import React, { useState, useEffect } from "react";
//import ".././styles.css"; // Add this line to link the CSS file
import "./App.css"

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json");
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="container">
      <h1 >Highly-rated kickstarter projects</h1>
      <PostList posts={currentPosts} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

const PostList = ({ posts }) => {
  return (
    <div>
      <table>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Percentage Funded</th>
                    <th>Amount Pledged</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((d)=>{
                    return(
                        <tr>
                            <td>{d["s.no"]}</td>
                            <td>{d["percentage.funded"]}</td>
                            <td>{d["amt.pledged"]}</td>
                        </tr>
                    )
                })}
            </tbody>
           </table>
    </div>
  );
};

const Pagination = ({
  postsPerPage,
  totalPosts,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber, e) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <a
              onClick={(e) => paginate(number, e)}
              href="!#"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default App;