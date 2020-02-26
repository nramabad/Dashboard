import axios from "axios";

export const getEmailPwnage = email => axios.get(`/api/pwned/${email}`);

export const getDomainPwnage = domain => axios.get(`https://haveibeenpwned.com/api/v2/breach/${domain}`);
