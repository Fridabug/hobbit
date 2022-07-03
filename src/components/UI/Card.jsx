import React, { useContext, useState } from "react";
import Button from "./Button";
import "./card.scss";
import { UserContext } from "../../context/user.context";
import ShowProfile from "../main/home/ShowProfile";

function Card({ imgUrl, name, text, hobbies, contactId, user, message, age, location }) {
    const { currentUser, sortedUsers, contacts, setContacts } =
        useContext(UserContext);

    const addContactHandler = (e) => {
        setContacts((prev) => [...prev, user]);
        console.log("works ", user);
    };

    const [toggle, setToggle] = useState(false);

    const togglePopUp = () => {
        setToggle(!toggle)
    }
    return (
        <div className="card">
            {imgUrl ? (
                <img className="card-img" src={imgUrl} alt="profile"></img>
            ) : (
                <img
                    className="card-img"
                    src="/img/no_picture.png"
                    alt="profile"
                ></img>
            )}
            <div className="card-body">
                <div className="card-title">{name}</div>
                <div className="card-text">{text}</div>
                <div className="tags">
                    {hobbies
                        ? hobbies.map((hobby) => (
                              <span className="tag">{hobby}</span>
                          ))
                        : null}
                </div>
            </div>
            <Button name="show profile" className="card-btn" onClick={togglePopUp} >
            </Button>
            <Button
                name="chat"
                className="card-btn"
                onClick={addContactHandler}
            >
                Chat
            </Button>
            {toggle ? <ShowProfile toggle={togglePopUp} userName={name} message={message} user={user} hobbies={hobbies} imgUrl={imgUrl} age={age} location={location}/> : null }
        </div>
    );
}

export default Card;
