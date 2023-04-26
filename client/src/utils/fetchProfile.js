import axios from 'axios';

export const fetchProfile = (user, setProfile) => {
    return new Promise ((resolve, reject) => {
        if (user) {
          axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: 'application/json'
              }
            })
            .then((res) => {
              localStorage.setItem('profile', JSON.stringify(res.data)); // store the user's profile in local storage
              resolve(res.data);
            })
            .catch((err) => console.log(err));
        } 
    })
};
