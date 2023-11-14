import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import useFetchData from "../../hooks/useFetchData";
import LoadingGif from "../misc/loadingGif";
import { BsPatchExclamation } from "react-icons/bs";
import AdCard from "../LandingPageComp/AdCard";

/**
 * @author Isac Zetterström
 * @description renders card for userinformation and the note to add userinfo when information is missing.
 */

function UserInfoCard({ setEditUser }) {
  const { loading, err, data } = useFetchData("/profile/user");

  return (
    <>
      {(!data?.phone || !data?.firstName || !data?.lastName) ? 
        <Row className="note-card mx-auto p-4 my-4">
        <Col className="d-flex flex-column align-items-center profile-note">
          <BsPatchExclamation className="note-icon" />
          <h6>Psst,</h6>
          <p className="text-center mt-1 note-whisper">
            Visste du att du får ta del av medlemserbjudanden om du fyller i dina uppgifter?
          </p>
          <Button
            className="note-btn"
            onClick={() => {
              setEditUser(true);
            }}
          >
            Lägg till mina uppgifter
          </Button>
        </Col>
      </Row>
      :
      <AdCard showButton={false}/>
      }
      {(loading && <LoadingGif />) || (err && <p>Gick inte att hämta dina uppgifter</p>) || (
        <Row className="user-info-card mx-auto my-4 p-4">
          <h6 className="line p-0">Dina uppgifter</h6>
          <table className="d-flex profile-row p-0">
            <thead>
              <tr className="d-flex flex-column">
                <th>Email:</th>
                <th>Telefon:</th>
                <th>Förnamn:</th>
                <th>Efternamn:</th>
              </tr>
            </thead>
            <tbody>
              <tr className="d-flex flex-column">
                <td className="text-truncate text-nowrap">{data.email}</td>
              </tr>
              <tr className="d-flex flex-column">
                <td>{!data.phone ? "Uppgift saknas" : data.phone}</td>
              </tr>
              <tr className="d-flex flex-column">
                <td>{!data.firstName ? "Uppgift saknas" : data.firstName}</td>
              </tr>
              <tr className="d-flex flex-column">
                <td>{!data.lastName ? "Uppgift saknas" : data.lastName}</td>
              </tr>
            </tbody>
          </table>
          <Col className="d-flex justify-content-center mt-3 profile-btn-container">
            <Button
              onClick={() => {
                setEditUser(true);
              }}
            >
              Redigera
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
}

export default UserInfoCard;
