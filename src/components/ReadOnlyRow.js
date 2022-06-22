import React from "react";

const ReadOnlyRow = ({ post, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{post.id}</td>
      <td>{post.title}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, post)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(post.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
