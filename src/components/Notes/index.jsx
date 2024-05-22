import React, { useEffect } from 'react';
import style from "./index.module.css";
import Note from '../Note';
import { useState } from 'react';
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const alpha = 0.6; 
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function Notes({isListView}) {
  const [notesList, setNotesList] = useState([]);

  useEffect(() => {
    const storedNotes = localStorage.getItem("notesList");
    if (storedNotes) {
      setNotesList(JSON.parse(storedNotes));
    } else {
      setNotesList([
        {
          id: uuidv4(),
          title: "Note 1",
          description: "Description for note 1",
          color: getRandomColor(),
        },
        {
          id: uuidv4(),
          title: "Note 2",
          description: "Description for note 2",
          color: getRandomColor(),
        },
        {
          id: uuidv4(),
          title: "Note 3",
          description: "Description for note 3",
          color: getRandomColor(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    console.log("updating -------");
    localStorage.setItem("notesList", JSON.stringify(notesList));
  }, [notesList]);

  const addNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "New Note",
      description: "New Description",
      color: getRandomColor(),
    };
    setNotesList([...notesList, newNote]);
  };

  const deleteNote = (id) => {
    const newNotesList = notesList.filter((note) => note.id !== id);
    setNotesList(newNotesList);
  };

  const editNote = (id, newTitle, newDescription) => {
    const newNotesList = notesList.map(note =>
      note.id === id
        ? { ...note, title: newTitle, description: newDescription }
        : note
    );
    setNotesList(newNotesList);
  };

  return (
    <div
      className={
        isListView ? style.notesContainerList : style.notesContainer
      }>
      {notesList.map(note => (
        <Note
          key={note.id}
          title={note.title}
          description={note.description}
          onDelete={() => deleteNote(note.id)}
          onEdit={(newTitle, newDescription) =>
            editNote(note.id, newTitle, newDescription)
          }
          color={note.color}
        />
      ))}
      <button className={style.addButton} onClick={addNote}>
        +
      </button>
    </div>
  );

}

Notes.propTypes = {
  isListView: PropTypes.bool.isRequired,
};




