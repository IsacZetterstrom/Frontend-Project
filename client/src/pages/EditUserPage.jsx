import React, { useState } from "react";
import { useFormDefaults } from "../hooks/useFormDefaults";
import EditUserForm from "../components/Forms/EditUserForm";
import { Container, Row } from "react-bootstrap";
import useFetchData from "../hooks/useFetchData";
import fetchService from "../service/FetchService";

/**
 * @author Niklas Nguyen
 * @description holds the editUser form and send the data to the server if it succeds the user will get a msg and closes the components again
 */

function EditUserPage({ setEditUser, runFunction }) {
  const { defaults, formData, setFormData } = useFormDefaults();
  const { loading, err, data } = useFetchData(`/profile/user`);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email === undefined) formData.email = null;
    if (formData.firstname === undefined) formData.firstname = null;
    if (formData.lastname === undefined) formData.lastname = null;
    if (formData.phone === undefined) formData.phone = null;

    const res = await fetchService.fetchRes("/profile/user", "PATCH", formData);
    if (res.status >= 400) {
      setMsg("Det blev fel vid uppdateringen");
      return false;
    } else {
      setMsg("Dina uppgifter har uppdaterats");
      setTimeout(() => setEditUser((val) => !val), 2000);
    }
  };

  return (
    <Container className="form-wrapper">
      <Row>
        <h1 className="p-0 text-nowrap fs-1 mt-5 mb-5 line pb-2">Redigera uppgifter</h1>
        {(loading && <p className="text-center">loading...</p>) || (err && <p className="text-center">Ett problem uppstod</p>) || (
          <EditUserForm
            {...{
              defaults,
              handleSubmit,
              setFormData,
              userData: data,
              runFunction,
            }}
          />
        )}
        {msg !== "" && <p className="text-center">{msg}</p>}
      </Row>
    </Container>
  );
}

export default EditUserPage;
