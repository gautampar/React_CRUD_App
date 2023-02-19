import axios from "axios";
import "./css/bookInput.css";

function BookInput({
  setShowMore,
  showMore,
  setBookTitle,
  setBookAuthor,
  BookDataAdd,
  setBookPrice,
  setBookPage,
  setButtonType,
  bookTitle,
  bookAuthor,
  bookPrice,
  bookPage,
  setBookData,
  buttonType,
}) {
  function BookInputDataClear(e) {
    e.preventDefault();
    setBookTitle("");
    setBookAuthor("");
    setBookPrice("");
    setBookPage("");
    setButtonType("Add");
    setShowMore(false)
  }
  function handleOnSubmit(e) {
    axios.get(`http://localhost/axiosreact/show_books.php`)
      .then(response => setBookData(response.data))
    e.preventDefault();
    BookDataAdd();
    BookInputDataClear(e);
  }
  return (
    <div>
      <div className="container my-5">
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className={`accordion-button text-light bg-primary collapsed`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                {buttonType} Books
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className={`accordion-collapse collapse ${showMore && 'collapse-show'}`}
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <form
                  onSubmit={(e) => handleOnSubmit(e)}
                  onReset={(e) => {
                    BookInputDataClear(e);
                  }}
                >
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Book Title
                        </label>
                        <input
                          value={bookTitle}
                          onChange={(e) => setBookTitle(e.target.value)}
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter Book Title"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Book Price
                        </label>
                        <input
                          value={bookPrice}
                          onChange={(e) => setBookPrice(e.target.value)}
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter Book Price"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Book Author
                        </label>
                        <input
                          value={bookAuthor}
                          onChange={(e) => setBookAuthor(e.target.value)}
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter Book Author"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Book Page
                        </label>
                        <input
                          value={bookPage}
                          onChange={(e) => setBookPage(e.target.value)}
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter Book Page"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <button type="submit" className="btn btn-info me-4">
                        {buttonType}
                      </button>
                      <button className="btn btn-secondary" type="reset">
                        Clear
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookInput;
