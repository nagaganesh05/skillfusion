

import React from 'react';
import { Form } from 'react-bootstrap';

const MeetingUserField = ({
  label,
  isInvalid,
  error,
  options,
  onChange,
  selectedOptions,
  isClearable = true,
  placeholder = '-- Select an option --',
  multiple = false
}) => {
  const value = multiple
    ? selectedOptions?.map((user) => user.uid) || []
    : selectedOptions?.uid || '';

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Select
        multiple={multiple}
        value={value}
        onChange={(e) => {
          const selectedValues = Array.from(e.target.selectedOptions).map(opt => opt.value);
          const selectedUsers = options.filter(user => selectedValues.includes(user.uid));
          onChange(multiple ? selectedUsers : selectedUsers[0] || null);
        }}
        isInvalid={isInvalid}
      >
        {isClearable && !multiple && (
          <option value="">{placeholder}</option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.uid}>
            {option.name}
          </option>
        ))}
      </Form.Select>

      {isInvalid && error?.length > 0 && (
        <Form.Text className="text-danger">{error[0]}</Form.Text>
      )}
    </Form.Group>
  );
};

export default MeetingUserField;
