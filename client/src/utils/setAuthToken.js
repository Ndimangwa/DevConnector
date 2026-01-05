import axios from 'axios';

/* This just set token in header, so everytime a header is sent , token is included
if no token, need to be removed from the header */
const setAuthToken = token => {
    const x_auth_token = 'x-auth-token';
    if (token)  {
        axios.defaults.headers.common[x_auth_token] = token;
    } else {
        delete axios.defaults.headers.common[x_auth_token];
    }
}
export default setAuthToken;