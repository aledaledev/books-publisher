import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, getBooks, selectBook, setBookInfo, toUpdate } from "../store/bookSlice";
import { Book, BookListState } from "../types";

const BookList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const { books, isLoading } = useSelector(
    (store: any) => store.booklist
  ) as BookListState;
  const { isLoggedIn,userName } = useSelector((store: any) => store.auth);

  const List =
    books.length === 0 ? (
      <h4>there is no books available</h4>
    ) : (
      books.map((book) => {

        return (
          <div key={book.id}>
            <span>{book.title}</span>
            <button
              disabled={!isLoggedIn || !(userName===book.author)}
              onClick={() =>
                dispatch(deleteBook(book))
                  .unwrap()
                  .then((originalPromiseResult) =>{
                    console.log(originalPromiseResult)
                  })
                  .catch((rejectedValueOrSerializedError) => {
                    console.log(rejectedValueOrSerializedError)
                  })
              }
            >
              delete
            </button>
            <button onClick={() => dispatch(setBookInfo(book))}>more info</button>
            <button disabled={!(userName===book.author) || !isLoggedIn} onClick={() => dispatch(toUpdate(book))}>edit</button>
          </div>
        );
      })
    );

  return (
    <div style={{ border: "1px solid black" }}>
      <h2>books</h2>
      <div>{isLoading ? "loading..." : List}</div>
    </div>
  );
};

export default BookList;
