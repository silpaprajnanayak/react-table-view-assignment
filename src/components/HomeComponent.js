import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import '../styles.css';
//import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import _ from 'lodash';
import SearchBar from './SearchBar';

const pageSize = 10;
const App = () => {
  //useState hooks
  const [contacts, setContacts] = useState();
  const [paginatedPosts, setPaginatedPosts] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [resultFound, setResultFound] = useState(false);
  
  //Set the Data at the time of page load
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => {
      setContacts(res.data);
      setPaginatedPosts(_(res.data).slice(0).take(pageSize).value());
      applyFilters();
    });
  },[searchInput]);

  const [editFormData, setEditFormData] = useState({
    id: "",
    title: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  // Edit form
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  // Edit Button click event
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      title: editFormData.title,
    };
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;
    setContacts(newContacts);
    setPaginatedPosts(_(newContacts).slice(0).take(pageSize).value());
    setEditContactId(null);
  };

  // Edit Form Value
  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      id: contact.id,
      title: contact.title,
    };
    setEditFormData(formValues);
  };

  // Cancel Button click event
  const handleCancelClick = () => {
    setEditContactId(null);
  };

  // Delete Button click event
  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);
    setContacts(newContacts);
    setPaginatedPosts(_(newContacts).slice(0).take(pageSize).value());
  };

  // Pagination Logic 
  const pageCount = contacts ? Math.ceil(contacts.length/pageSize) : 0;
  if(pageCount === 1) return null;
  const pages = _.range(1, pageCount+1);

  const pagination = (pageNo) => {
     setCurrentPage(pageNo);
     const startIndex = (pageNo - 1) * pageSize;
     const paginatedPost = _(contacts).slice(startIndex).take(pageSize).value();
     setPaginatedPosts(paginatedPost);
  }

  // Search Filter
  const applyFilters = () => {
    let updatedList = contacts;

    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.title.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }

    !updatedList.length ? setResultFound(false) : setResultFound(true);
    setPaginatedPosts(_(updatedList).slice(0).take(pageSize).value());
  }
  return (
    <div className="container">
      <h3 style={{textAlign: 'center', fontWeight: 'bold',  marginTop: 5, color: "rgb(117, 201, 250)"}}>React Table View with pagination</h3>

      {/* Search Bar */}
      <SearchBar value={searchInput}
        changeInput={(e) => setSearchInput(e.target.value)} />
      
      {/* Table View Starts*/}
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!paginatedPosts ? ("No Data Found") : paginatedPosts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      {/* Table View Ends*/}

      {/* Pagination List Starts*/}
      <div className="mt-3">
        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            {
              pages.map((page)=>(
                <li className={
                  page === currentPage ? "page-item active" : "page-item"
                }><p className="page-link" onClick={() => pagination(page)}>{page}</p></li>
              ))
            }
          </ul>
        </nav>
      </div>
      {/* Pagination List Ends*/}
    </div>
  );
};

export default App;
