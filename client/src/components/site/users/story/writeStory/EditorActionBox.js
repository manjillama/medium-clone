import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

export default function EditorActionBox(props){
  console.log(props);
  return (
    <div id="editorBox" style={{transform: `translate(${props.clientX}px, ${props.clientY}px)`}}>
      <EditButton cmd="bold" name="bold" />
      <EditButton cmd="italic" name="italic"/>
      <EditButton cmd="formatBlock" arg="<h1>" name="heading" />
      <EditButton cmd="formatBlock" arg="<p>" name="a" />
      <EditButton cmd="formatBlock" arg="<blockquote>" name='quote' />

      <EditButton cmd="insertHTML" arg="&zwnj;<pre><div>&zwnj;" name="code" />
      <EditButton cmd="insertUnorderedList" name="list" />
      <EditButton
        cmd="backColor"
        arg="yellow"
        name="highlight"
      />
      <EditButton
        cmd="createLink"
        arg="https://www.linkedin.com/in/manjiltamang/"
        name="hyperlink"
      />
      <EditButton
        cmd="unlink"
        name="unlink"
      />
    </div>
  );
}

function EditButton(props) {
  return (
    <button
      type="button"
      key={props.cmd}
      className="btn-chromeless"
      onMouseDown={evt => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
      }}
    >
      <RenderEditorBtntext name={props.name}/>
    </button>
  );
}

function RenderEditorBtntext(props){
  switch (props.name) {
    case 'quote':
      return <i className="fa fa-quote-left"></i>
    case 'hyperlink':
      return <i className="fa fa-link"></i>
    case 'code':
      return <i className="fa fa-code"></i>
    case 'heading':
      return <i className="fa fa-font"></i>
    case 'bold':
      return <i className="fa fa-bold"></i>
    case 'italic':
      return <i className="fa fa-italic"></i>
    case 'highlight':
      return <i className="fa fa-i-cursor"></i>
    case 'unlink':
      return <i className="fa fa-unlink"></i>
    case 'list':
      return <i className="fa fa-list-ul"></i>
    default:
      return props.name;
  }
}
