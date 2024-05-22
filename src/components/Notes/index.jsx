import React, { useEffect } from 'react';
import style from "./index.module.css";
import Note from '../Note';
import { useState } from 'react';

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
          title: "Note 1",
          description: "Description for note 1",
          color: getRandomColor(),
        },
        {
          title: "Note 2",
          description: "Description for note 2",
          color: getRandomColor(),
        },
        {
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
      title: "New Note",
      description: "New Description",
      color: getRandomColor(),
    };
    setNotesList([...notesList, newNote]);
  };

  const deleteNote = (index) => {
    const newNotesList = notesList.filter((_, i) => i !== index);
    setNotesList(newNotesList);
  };

  const editNote = (index, newTitle, newDescription) => {
    const newNotesList = notesList.map((note, i) =>
      i === index
        ? { ...note, title: newTitle, description: newDescription }
        : note
    );
    setNotesList(newNotesList);
    console.log(notesList);
  };

  return (
    <div
      className={
        isListView ? style.notesContainerList : style.notesContainer
      }>
      {notesList.map((note, index) => (
        <Note
          key={index}
          title={note.title}
          description={note.description}
          onDelete={() => deleteNote(index)}
          onEdit={(newTitle, newDescription) =>
            editNote(index, newTitle, newDescription)
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




