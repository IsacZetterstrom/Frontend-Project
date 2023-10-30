import React from "react";
import useFetchData from "../hooks/useFetchData";
import { Container, Row, Col } from "react-bootstrap";
import ActiveBookings from "../components/ProfilePage/ActiveBookings";
import ExpiredBookings from "../components/ProfilePage/ExpiredBookings";
import LoadingGif from "../components/misc/loadingGif";
import UserInfoCard from "../components/ProfilePage/UserInfoCard";
import EditUserPage from "./EditUserPage";

/**
 * @author Isac Zetterström
 * @description Renders components for profilepage
 */

function ProfilePage() {
  const { loading, err, data } = useFetchData("profile/user/bookings");
  const [editUser, setEditUser] = useState(false);
  const toggleEditUser = () => {
    setEditUser((editUser) => !editUser);
  };

  return (
    <Container className="profile-container">
      {err && <p>Fel vid hämtning av profilsidan har inträffat</p>}
      {loading ? (
        <LoadingGif />
      ) : (
        <>
          <Row>
            <Col className="offset-sm-2 offset-md-3 offset-lg-3">
              <h1 className="line pb-1 my-3">Min Sida</h1>
            </Col>
          </Row>
          <Row className="d-flex flex-column flex-lg-row-reverse justify-content-lg-between">
            <Col lg={9}>
              <ActiveBookings activeBookings={data?.active} />
              <ExpiredBookings expiredBookings={data?.expired} />
            </Col>
            <Col lg={3}>
              {editUser && <UserInfoCard {...{ setEditUser }} />}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
