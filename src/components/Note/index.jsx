import React from "react";
import style from "./index.module.css";
import { useState } from 'react';
import PropTypes from "prop-types";


function Note({title, description,color, onDelete, onEdit}) {

    const [isEditing, setIsEditing] = useState(false);
     const [newTitle, setNewTitle] = useState(title);
     const [newDescription, setNewDescription] = useState(description);

    const handleSave = () => {
      onEdit(newTitle, newDescription);
      setIsEditing(false);
    };

    const handleBlur = () => {
        handleSave()
    }


   

    const handleTitleInput = (e) => {
       setNewTitle(e.target.textContent);
     };

    const handleDescriptionInput = (e) => {
       setNewDescription(e.target.textContent);
     };

  return (
    <div
      className={style.note}
      onClick={() => setIsEditing(true)}
      style={{ backgroundColor: color }}>
      <div className={style.noteHeader}>
        <h3
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          onBlur={handleBlur}
          onInput={handleTitleInput}>
          {title}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}>
          X
        </button>
      </div>
      <textarea
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onBlur={handleBlur}
        onInput={handleDescriptionInput}>
        {description}
      </textarea>
    </div>
  );
}

Note.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Note