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

  function downloadBook(book) {
    //download(book?.bookUrl,"geoip.json")
    const link = document.createElement('a');
    link.href = book?.bookUrl; 
    console.log(link.href)
    link.download = `${book.title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setModalShow(false);
  };
  
  function download(url, filename) {
    fetch(url).then(function(t) {
        return t.blob().then((b)=>{
            var a = document.createElement("a");
            a.href = URL.createObjectURL(b);
            a.setAttribute("download", filename);
            a.click();
        }
        );
    });
    }
    
    

  return (
      <>
        <Container fluid className="my-5">
          <Row className="books-container">
            {data?.length !== 0 && data.map((book, index) => {
              return (
                <Col xl={3} lg={4} md={6} sm={6} xs={12} key={index} className="book-wrapper">
                  <Card className="book-item-holder">
                    <div className="book-item">
                      <div className="bg-img-wrapper">
                      <div style={{backgroundImage: `url(${book?.thumbnailUrl})`}} className="bg-img position-relative"></div>
                        {/* <div className={`bg-img position-relative i-${book?._id}`}></div> */}
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
            {data?.length === 0 &&
              <Col xs={12}>
                <div className="d-flex justify-content-center align-middle no-data-block mt-5 pt-5">
                    No data available
                </div>
              </Col>
            }
          </Row>
        </Container>
        <BookPreview
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={selectedBook}
          // pdfdownload={() => downloadBook(selectedBook)}
        />
      </>
  );

}

export default BooksGrid;