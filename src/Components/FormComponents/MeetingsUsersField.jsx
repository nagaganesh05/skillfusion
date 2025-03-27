
import React, { useState } from "react";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";

const MeetingUserField = ({
  label,
  isInvalid,
  error,
  options = [],
  onChange,
  selectedOptions,
  isClearable = true,
  placeholder = "Search for a user...",
  multiple = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Filter users based on search input
  const filteredOptions = options.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredOptions.length / usersPerPage);
  const paginatedOptions = filteredOptions.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  // Handle selection
  const handleChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    const selectedUsers = options.filter((user) => selectedValues.includes(user.uid));
    onChange(multiple ? selectedUsers : selectedUsers[0] || null);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>

      {/* Search Field */}
      <InputGroup className="mb-2">
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {/* Select Field */}
      <Form.Select multiple={multiple} onChange={handleChange} isInvalid={isInvalid}>
        {isClearable && !multiple && <option value="">{placeholder}</option>}
        {paginatedOptions.length > 0 ? (
          paginatedOptions.map((option) => (
            <option key={option.uid} value={option.uid}>
              {option.name}
            </option>
          ))
        ) : (
          <option disabled>No users found</option>
        )}
      </Form.Select>

      {/* Pagination Controls */}
      <Row className="mt-2">
        <Col className="d-flex justify-content-between">
          <Button
            size="sm"
            variant="outline-primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <span>Page {currentPage} of {totalPages || 1}</span>
          <Button
            size="sm"
            variant="outline-primary"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </Col>
      </Row>

      {/* Error Message */}
      {isInvalid && error?.length > 0 && (
        <Form.Text className="text-danger">{error[0]}</Form.Text>
      )}
    </Form.Group>
  );
};

export default MeetingUserField;

