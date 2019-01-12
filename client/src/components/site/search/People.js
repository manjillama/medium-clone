import React from 'react';

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
          <a href={`/@${person.username}`}>
            <h3>{person.fullname}</h3>
          </a>
          <p>{person.bio}</p>
        </div>
      </div>
    );
  });
}

function _renderProfileImage(person){
  if(person.profile_image){
    return (
      <a href={`/@${person.username}`}>
        <img className="usr--img" src={person.profile_image} alt={person.fullname}/>
      </a>
    );
  }else{
    const initial = person.fullname.charAt(0);
    return (
      <a href={`/@${person.username}`}>
        <div className="usr--img"><span>{initial}</span></div>
      </a>
    );
  }
}
