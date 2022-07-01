import React, { useContext } from "react";
import { UserContext } from "../../../context/user.context";
import UserCards from "./UserCards";
import SearchBar from "./SearchBar";
import "./home.scss";

function Home() {
    const { currentUser, hobbies } = useContext(UserContext);
    return (
        <div className="home">
            {hobbies ? (
                <>
                    <div className="home-header">
                        <h1>Some great people in your area</h1>
                        <h3>Off to your next adventure!</h3>
                    </div>
                    <SearchBar />
                    <UserCards />
                </>
            ) : null}
        </div>
    );
}

export default Home;
