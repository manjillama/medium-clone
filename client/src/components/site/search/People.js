import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  return (
    <div className="p-c">
      {renderPeople(props.people)}
    </div>
  );
}

function renderPeople(people){
  return people.map(person => {
    return (
      <div key={person.id} className="people-c d--flex">
        {_renderProfileImage(person)}
        <div className="p-a">
          <Link to={`/@${person.username}`}>
            <h3>{person.fullname}</h3>
          </Link>
          <p>{person.bio}</p>
        </div>
      </div>
    );
  });
}

function _renderProfileImage(person){
  if(person.profile_image){
    return (
      <Link to={`/@${person.username}`}>
        <img className="usr--img" src={person.profile_image} alt={person.fullname}/>
      </Link>
    );
  }else{
    const initial = person.fullname.charAt(0);
    return (
      <Link to={`/@${person.username}`}>
        <div className="usr--img"><span>{initial}</span></div>
      </Link>
    );
  }
}
