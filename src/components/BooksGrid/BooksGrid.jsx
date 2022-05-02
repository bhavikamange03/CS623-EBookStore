import React, { useState } from "react";
import "./BooksGrid.scss";
import { Row, Card, Col, Container } from 'react-bootstrap';
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import BookPreview from "../BookPreview/BookPreview";

function BooksGrid({ data }) {
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState({});

  const showBookDetails = (book) => {
    setSelectedBook(book);
    setModalShow(true);
  }

  const downloadBook = (book) => {
    console.log('downloadBook item', book);
    setModalShow(false);
  };

  return (
      <>
        <Container fluid className="my-5">
          <Row className="books-container">
            {data.map((book, index) => {
              return (
                <Col xl={2} lg={2} md={3} sm={6} xs={12} key={index} className="book-wrapper">
                  <Card className="book-item-holder">
                    <div className="book-item">
                      <div className="bg-img-wrapper">
                        <div className={`bg-img position-relative i-${book?._id}`}></div>
                      </div>
                      <div className="book-details mt-3" title={book?.title || ''}>
                        {book?.title || 'NA'}
                      </div>
                    </div>
                    <div className="book-overlay"></div>
                    <div className="book-overlay-content">
                      <div className="book-overlay-content-wrapper">
                        <i className="mr-2 p-1 cursor-pointer" onClick={() => showBookDetails(book)}><RemoveRedEyeIcon /></i>
                        <i className="p-1 cursor-pointer" onClick={() => downloadBook(book)}> <CloudDownloadIcon /></i>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
        <BookPreview
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={selectedBook}
          onDownload={() => downloadBook(selectedBook)}
        />
      </>
  );

}

export default BooksGrid;