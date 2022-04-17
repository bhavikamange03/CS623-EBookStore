import React, { useState } from "react";
import "./BooksGrid.scss";
import { Row, Card, Col, Container } from 'react-bootstrap';
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
// import CloseIcon from "@material-ui/icons/Close";

function BooksGrid({ data }) {
  // const [booksData, setBooksData] = useState([]);
  // const [searchterm, setSearchTerm] = useState("");

  // if (searchterm && searchterm !== '') {
  //   setSearchTerm(searchterm);
  // }

  if (data && data.length > 0) {
    data = data.slice(0, 16);
    // setBooksData(data);
  }

  // function showBookDetails(item) {
  //   console.log('showBookDetails item', item);
  // }

  console.log('booksData', data);

  function showBookDetails(item) {
    console.log('showBookDetails item', item);
  }

  function downloadBookDetails(item) {
    console.log('downloadBookDetails item', item);
  }

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
                        <div style={{backgroundImage: `url(${book?.thumbnailUrl})`}} className="bg-img position-relative"></div>
                      </div>
                      <div className="book-details mt-3" title={book?.title || ''}>
                        {book?.title || 'NA'}
                      </div>
                    </div>
                    <div className="book-overlay"></div>
                    <div className="book-overlay-content">
                      <div className="book-overlay-content-wrapper">
                        <i className="mr-2 p-1 cursor-pointer" onClick={() => showBookDetails(book)}><RemoveRedEyeIcon /></i>
                        <i className="p-1 cursor-pointer" onClick={() => downloadBookDetails(book)}> <CloudDownloadIcon /></i>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </>
  );

}

export default BooksGrid;