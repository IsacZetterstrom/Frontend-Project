import React from "react";
import useFetchData from "../hooks/useFetchData";
import { Container } from "react-bootstrap";
import ActiveBookings from "../components/ProfilePage/ActiveBookings";
import ExpiredBookings from "../components/ProfilePage/ExpiredBookings";
import LoadingGif from "../components/misc/loadingGif";

/**
 * @author Isac Zetterström
 * @description Renders components for profilepage
 */

function ProfilePage() {
  const { loading, err, data } = useFetchData("profile/user/bookings");

  return (
    <Container className="profile-container">
      {err && <p>Fel vid hämtning av profilsidan har inträffat</p>}
      {loading ? (
        <LoadingGif />
      ) : (
        <>
          <h1>Min Sida</h1>
          <ActiveBookings activeBookings={data?.active} />
          <ExpiredBookings expiredBookings={data?.expired} />
        </>
      )}
    </Container>
  );
}

export default ProfilePage;
