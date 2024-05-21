
import style from "./index.module.css";
import { useState } from 'react';

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


    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSave();
      }
    };

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
          onKeyDown={handleKeyDown}
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
      <p
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onInput={handleDescriptionInput}>
        {description}
      </p>
    </div>
  );
}

export default Note