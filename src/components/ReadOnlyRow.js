import React from "react";
import { Button } from "reactstrap";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.id}</td>
      <td>{contact.title}</td>
      <td>
        <Button
          type="button" color="success" 
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </Button>
        <Button type="button" color="danger" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
