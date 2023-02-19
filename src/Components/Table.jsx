import React, { useEffect, useState } from "react";
import BookInput from "./BookInput";
import axios from "axios";
import Fuse from "fuse.js";
import SearchBar from "./SearchBar";

let axiosConfig = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

let axiosRequest = {
  request: {
    withCredentials: true,
  },
};

function Table() {
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookEditableId, setBookEditableId] = useState();
  const [bookPage, setBookPage] = useState("");
  const [booksData, setBookData] = useState([]);
  const [buttonType, setButtonType] = useState("Add");
  const [editing, setEditing] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookPerPage, setBookPerPage] = useState(10);
  const [filterOnSearch, setFilterOnSearch] = useState("");

  const indexOfLastBook = currentPage * bookPerPage;
  const indexOfFirstBook = indexOfLastBook - bookPerPage;
  const currentBook = booksData.slice(indexOfFirstBook, indexOfLastBook);

  const prevPageClick = () => {
    if (hasPrev) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPageClick = () => {
    if (hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  /*        DataAdd in Dashboard Start           */

  function BookDataAdd() {
    if (editing === false) {
      var data = {
        book_title: bookTitle,
        book_author: bookAuthor,
        book_price: bookPrice,
        book_page: bookPage,
      };

      axios
        .post(`http://localhost/axiosreact/add_book.php`, data, axiosConfig)
        .then((response) => response)
        .catch((err) => err);
      } else {
        let currentData = {
        book_id: bookEditableId,
        book_title: bookTitle,
        book_author: bookAuthor,
        book_page: bookPage,
        book_price: bookPrice,
      };

      axios
        .post(
          `http://localhost/axiosreact/edit_book.php`,
          currentData,
          axiosConfig,
          axiosRequest
        )
        .then((response) => response)
        .catch((error) => error);
      }
      setButtonType("Add");
      setEditing(false);
  }
  
  /*        DataAdd in Dashboard End           */
  
  /*        Data Edit in Dashboard Start           */
  
  function HandleOnEdit(id) {
    const bookEdit = booksData.find((element) => element.book_id === id);
    setBookAuthor(bookEdit.book_author);
    setBookTitle(bookEdit.book_title);
    setBookPage(bookEdit.book_page);
    setBookPrice(bookEdit.book_price);
    setBookEditableId(id);
    
    setButtonType("Edit");
    setEditing(true);
    setShowMore(true);
  }
  
  /*        Data Edit in Dashboard End           */

  /*        Data Delete in Dashboard Start           */

  function HandleOnDelete(id) {
    const deleteItem = {
      book_id: id,
    };
    axios
      .post(
        `http://localhost/axiosreact/delete-book.php`,
        deleteItem,
        axiosConfig,
        axiosRequest
      )
      .then((res) => res)
      .catch((error) => error);
  }

  /*        Data Delete in Dashboard End           */
  const options = {
    location: 0,
    threshold: 0,
    distance: 100,
    ignoreLocation: true,
    // includeScore: true,
    keys: ["book_title", "book_author"],
  };

  const fuse = new Fuse(booksData, options);
  const pattern = filterOnSearch;
  const result = fuse.search(pattern);
  /*        Data Map in Dashboard Start           */

  let hasPrev = currentPage > 1;
  let hasNext = currentPage < booksData.length - 10;
  /*        Data Map in Dashboard End           */
  useEffect(() => {
    axios
      .get(`http://localhost/axiosreact/show_books.php`, axiosConfig)
      .then((res) => {
        setBookData(res.data);
      });
    });
    
    const bookList = currentBook.map((element, index) => {
      return (
        <tr key={index}>
              <th scope="row">{element.book_id}</th>
              <td scope="col">{element.book_title}</td>
              <td scope="col">{element.book_author}</td>
              <td scope="col">{element.book_price}</td>
              <td scope="col">{element.book_page}</td>
              <td scope="col">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => HandleOnEdit(element.book_id)}
                >
                  Edit
                </button>
              </td>
              <td scope="col">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => HandleOnDelete(element.book_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })

  const searchList = result.map((element, index) => {
    return (
      <tr key={index}>
        <th scope="row">{element.item.book_id}</th>
        <td scope="col">{element.item.book_title}</td>
        <td scope="col">{element.item.book_author}</td>
        <td scope="col">{element.item.book_price}</td>
        <td scope="col">{element.item.book_page}</td>
        <td scope="col">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => HandleOnEdit(element.item.book_id)}
          >
            Edit
          </button>
        </td>
        <td scope="col">
          <button
            className="btn btn-danger btn-sm"
            onClick={() => HandleOnDelete(element.item.book_id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  })

  return (
    <div>
      <BookInput
        setShowMore={setShowMore}
        showMore={showMore}
        BookDataAdd={BookDataAdd}
        booksData={booksData}
        bookAuthor={bookAuthor}
        bookTitle={bookTitle}
        bookPage={bookPage}
        bookPrice={bookPrice}
        setBookData={setBookData}
        setBookAuthor={setBookAuthor}
        setBookPrice={setBookPrice}
        setBookTitle={setBookTitle}
        setBookPage={setBookPage}
        setButtonType={setButtonType}
        buttonType={buttonType}
      />
      <div className="container">
        <div className="mb-3">
          <SearchBar
            filterOnSearch={filterOnSearch}
            setFilterOnSearch={setFilterOnSearch}
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr No.</th>
              <th scope="col">Book Title</th>
              <th scope="col">Book Author</th>
              <th scope="col">Book Price</th>
              <th scope="col">Book Page</th>
              <th scope="col">Book Edit</th>
              <th scope="col">Book Delete</th>
            </tr>
          </thead>
          <tbody>{filterOnSearch.length > 0 ?  searchList : bookList}</tbody>
        </table>
        <div className="pagination align-items-center">
          <button
            className="btn btn-primary"
            disabled={!hasPrev}
            onClick={() => prevPageClick()}
          >
            Previous
          </button>
          <span className="mx-3">{currentPage}</span>
          <button
            className="btn btn-primary"
            disabled={!hasNext}
            onClick={() => nextPageClick()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table;
