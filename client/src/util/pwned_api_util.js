import axios from "axios";

export const getEmailPwnage = email => {
    return axios.get(`/api/pwned/${email}`);
}

export const getDomainPwnage = domain => {
    return axios.get(`https://haveibeenpwned.com/api/v2/breach/${domain}`);
}
