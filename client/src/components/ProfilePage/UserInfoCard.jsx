import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import useFetchData from "../../hooks/useFetchData";
import LoadingGif from "../misc/loadingGif";

function UserInfoCard({ setEditUser }) {
  const { loading, err, data } = useFetchData("/profile/user");
  return (
    <>
      {(loading && <LoadingGif />) ||
        (err && <p>Gick inte att hämta dina uppgifter</p>) || (
          <Row className="user-info-card mx-auto">
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
                  <td>
                    {!data.firstName
                      ? "Uppgiften är ej registrerad"
                      : data.firstName}
                  </td>
                </tr>
                <tr className="d-flex flex-column">
                  <td>
                    {!data.lastName
                      ? "Uppgiften är ej registrerad"
                      : data.lastName}
                  </td>
                </tr>
                <tr className="d-flex flex-column">
                  <td>
                    {!data.Phone ? "Uppgiften är ej registrerad" : data.Phone}
                  </td>
                </tr>
              </tbody>
            </table>
            <Col className="d-flex justify-content-start card-btn-container my-3">
              <Button className="p-0">Redigera</Button>
            </Col>
          </Row>
        )}
    </>
  );
}

export default UserInfoCard;
