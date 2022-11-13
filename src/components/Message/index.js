import React from 'react';

import './index.css';

const Message = ({ apiState }) => {
    let message = null;

    if (apiState.loading) {
        message = 'Request is being processed!';
    }

    if (apiState.error === 'send_failure') {
        const failedEmails = (
            <ul>
                {apiState.response.emails.map((email) => (
                    <li key={email}>{email}</li>
                ))}
            </ul>
        );
        message = <>Failed to send to: {failedEmails}</>;
    } else if (apiState.error) {
        message = apiState.error;
    }

    if (!apiState.error && apiState.response) {
        message = 'Emails are sent successfully!';
    }

    return message ? <div>{message}</div> : null;
};

export default Message;
