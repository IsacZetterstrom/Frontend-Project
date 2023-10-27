import React, { useState } from "react";
import useFetchData from "../hooks/useFetchData";
import { Container, Row, Col } from "react-bootstrap";
import ActiveBookings from "../components/ProfilePage/ActiveBookings";
import ExpiredBookings from "../components/ProfilePage/ExpiredBookings";
import LoadingGif from "../components/misc/loadingGif";

function ProfilePage() {
  const { loading, err, data } = useFetchData("profile/user/bookings");
  // console.log(data);
  return (
    <Container className="profile-container">
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
