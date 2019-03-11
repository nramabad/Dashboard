import * as APIUtil from '../util/pwned_api_util';

export const RECEIVE_DOMAIN = "RECEIVE_DOMAIN";
export const RECEIVE_EMAIL = "RECEIVE_EMAIL";

export const receiveDomain = domain => ({
    type: RECEIVE_DOMAIN,
    domain
});

export const fetchDomain = domain => dispatch => (
    APIUtil.getDomainPwnage(domain)
        .then(domain => dispatch(receiveDomain(domain)))
);

export const receiveEmail = email => ({
    type: RECEIVE_EMAIL,
    email
});

export const fetchEmail = email => dispatch => (
    APIUtil.getEmailPwnage(email)
        .then(email => dispatch(receiveEmail(email)))
);

