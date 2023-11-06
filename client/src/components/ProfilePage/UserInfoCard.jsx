import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import useFetchData from "../../hooks/useFetchData";
import LoadingGif from "../misc/loadingGif";
import { BsPatchExclamation } from "react-icons/bs";
/**
 * @author Isac Zetterström
 * @description renders card for userinformation
 */

function UserInfoCard({ setEditUser }) {
  const { loading, err, data } = useFetchData("/profile/user");
  return (
    <>
      {(!data?.phone || !data?.firstName || !data?.lastName) && (
        <Row className="note-card mx-auto p-2 my-4">
          <Col className="d-flex flex-column align-items-center profile-note">
            <BsPatchExclamation className="note-icon" />
            <p className="text-center mt-3 note-whisper">Psst, Visste du att du får ta del av medlemserbjudanden om du fyller i dina uppgifter?</p>
            <p className="text-center note-information">Registrera gärna saknade uppgifter genom att trycka på knappen nedan!</p>
            <Button
              className="p-1"
              onClick={() => {
                setEditUser(true);
              }}>
              Fyll i mina uppgifter
            </Button>
          </Col>
        </Row>
      )}
      {(loading && <LoadingGif />) || (err && <p>Gick inte att hämta dina uppgifter</p>) || (
        <Row className="user-info-card mx-auto my-4">
          <h6 className="line">Dina uppgifter</h6>
          <table className="d-flex profile-row">
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
                <td>{!data.phone ? "Uppgiften är ej registrerad" : data.phone}</td>
              </tr>
              <tr className="d-flex flex-column">
                <td>{!data.firstName ? "Uppgiften är ej registrerad" : data.firstName}</td>
              </tr>
              <tr className="d-flex flex-column">
                <td>{!data.lastName ? "Uppgiften är ej registrerad" : data.lastName}</td>
              </tr>
            </tbody>
          </table>
          <Col className="d-flex justify-content-start card-btn-container my-3">
            <Button
              className="p-0"
              onClick={() => {
                setEditUser(true);
              }}>
              Redigera
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
}

export default UserInfoCard;
