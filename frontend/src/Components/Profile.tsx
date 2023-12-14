import { useState } from 'react';
import avatar from '../images/avatar.png';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { messagesUrl } from '../constants/URLS';

const getMessages = async () => {
  let { data } = await axios.get(messagesUrl, { headers: { token: localStorage.getItem('userToken') } })

  return data.messages
}

export const Profile = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userID, setUserID] = useState("");


  const { data, isLoading } = useQuery(
    ["messages", localStorage.getItem("userToken")],
    () => getMessages()
  );


  const getUserID = () => {

    if (localStorage.getItem("userToken")) {
      let decoded = jwtDecode(localStorage.getItem("userToken")!) as { userId: string };
      if (decoded.userId)
        setUserID(decoded.userId);
    } else {
      setUserID("")
    }
  }

  return (
    <div>
      <Button variant="btn btn-default-outline my-5 d-block mx-auto" onClick={() => {
        handleShow();
        getUserID();
      }}>
        <i className="fa-solid fa-share"></i> Share
      </Button>
      <div className="container text-center py-5 my-5 text-center">
        <div className="card py-5 mb-5">
          <a>
            <img src={avatar} className="avatar" alt="profile pic" />
          </a>
          <h3 className="py-2">Profile name</h3>

          {isLoading
            ? <p>There is no messages!</p>
            : data.map((message: any, index: number) => (
              <div className="card text-center my-3 mb-3" key={index}>
                <div className="card-body"><div key={index}>{message.message}</div></div>
              </div>
            ))}
        </div>


        {/* Share profile Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Share link with your friends</Modal.Title>
          </Modal.Header>
          <Modal.Body>{userID ? `${window.location.hostname}:${window.location.port}/message/${userID}` : ""}</Modal.Body>
          <Modal.Footer>
            <Button variant="btn btn-default-outline" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>

  );
}
