import React, { useState } from "react";
import "./BookPreview.scss";
import { Row, Card, Col, Container, Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, Button } from 'react-bootstrap';
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

function BookPreview(props) {
    console.log('props data', props?.data);



    const downloadBook = (book) => {
      const link = document.createElement('a');
      link.href = book?.bookUrl; 
      console.log(link.href)
      link.download = `${book.title}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      props.onHide();
    };

    return (
      <>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {props?.data?.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Container fluid className="py-5">
                  <Row className="books-preview-container">
                      <Col xs={3}>
                          <div style={{backgroundImage: `url(${props?.data?.thumbnailUrl})`}} className="bg-img position-relative"></div>
                      </Col>
                      <Col xs={9}>
                          <div className="">
                              {props?.data?.shortDescription}
                          </div>
                          <Button className="mt-4" onClick={() => downloadBook(props?.data)}>Download</Button>
                      </Col>
                  </Row>
              </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => props.onHide()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

  export default BookPreview;