import { useEffect, useRef, useState } from 'react';

interface IEditableParagraph {
    msj : string
}


const EditableParagraph: React.FC<IEditableParagraph> = ({ msj="" }) => {

  const [content, setContent] = useState(msj);
  const editableRef = useRef(null);

  useEffect(() => {
    // Initialize contentEditable with initial state content
    if (editableRef.current ) {
      editableRef.current.innerHTML = content;
    }
  }, [content]);

  const handleBlur = () => {
    if (editableRef.current) {
      setContent(editableRef.current.innerHTML);
    }
  };

  const insertTextAtCursor = (text) => {
    const editableElement = editableRef.current;
    if (!editableElement) return;
    editableElement.focus();

    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);

    range.deleteContents();
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);

    // Move the cursor to the end of the inserted text node
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);

    setContent(editableElement.innerHTML); // Update the state with the new content
  };

  return (
    <div>
      <p
        contentEditable="true"
        ref={editableRef}
        onBlur={handleBlur}
        style={{ border: '1px solid black', padding: '10px', minHeight: '100px' }}
      >{content}</p>
      <button onClick={() => insertTextAtCursor('[name]')}>Insert [name]</button>
    </div>
  );
}

export default EditableParagraph;