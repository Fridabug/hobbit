import { useContext } from 'react';
import { UserContext } from '../../../context/user.context';
import './../../../styling/ProfileStyling/_Profile.scss';
import Context from '../../../context/contextProvider';
const Profile = ({ id }) => {
  useContext(UserContext);
  useContext(Context);

  // picture,hobbies, location, age, gender, description
  return;
};

export default Profile;
