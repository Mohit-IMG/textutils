// TextForm.js
import React, { useState, useEffect } from 'react';
import Alert from "./Alert";

export default function TextForm(props) {
    const [text, setText] = useState("");
    const [foundUrls, setFoundUrls] = useState([]);
    const [foundEmails, setFoundEmails] = useState([]);
    const [minutesRead, setMinutesRead] = useState(0);
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type,
        });

        // Automatically close the alert after 2 seconds
        const timeout = setTimeout(() => {
            closeAlert();
        }, 2000);

        // Set the timeout in the state
        setAlert(prevState => ({ ...prevState, timeout }));
    };

    const closeAlert = () => {
        // Clear the timeout when closing the alert
        if (alert && alert.timeout) {
            clearTimeout(alert.timeout);
        }
        setAlert(null);
    };

    const handleUpclick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        showAlert("Converted to uppercase!", "success");
    };

    const handleUpclick1 = () => {
        let newText1 = text.toLowerCase();
        setText(newText1);
        showAlert("Converted to lowercase!", "success");
    };

    const handleOnChange = (event) => {
        const newText = event.target.value;
        setText(newText);
    };

    const handleClear = () => {
        setText('');
        setFoundUrls([]);
        setFoundEmails([]);
        closeAlert(); // Hide the alert when clearing
    };

    const findUrl = () => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;

        const urls = text.match(urlRegex) || [];
        const emails = text.match(emailRegex) || [];

        setFoundUrls(urls);
        setFoundEmails(emails);

        // Set the alert message and show the alert
        let newAlertMsg = "";
        if (urls.length > 0 || emails.length > 0) {
            newAlertMsg += "Detected in the text:\n";
            if (urls.length > 0) {
                newAlertMsg += `Websites: ${urls.join(', ')}\n`;
            }
            if (emails.length > 0) {
                newAlertMsg += `Emails: ${emails.join(', ')}\n`;
            }
            showAlert(newAlertMsg, "success");
        } else {
            newAlertMsg = "No URLs or Emails found in the text.";
            showAlert(newAlertMsg, "danger");
        }
    };

    useEffect(() => {
        // Clear the timeout when the component unmounts
        return () => {
            if (alert && alert.timeout) {
                clearTimeout(alert.timeout);
            }
        };
    }, []);

    useEffect(() => {
        // Update minutesRead when text changes
        setMinutesRead(text === "" ? 0 : 0.008 * text.split(" ").length);
    }, [text]);

    return (
        <div style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
            <div className="container mb-3" >
                <h2>{props.heading}</h2>
                <textarea
                    className="form-control"
                    value={text}
                    id="myBox"
                    onChange={handleOnChange}
                    rows="8"
                    style={{ backgroundColor: props.mode === 'dark' ? 'grey' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }}
                ></textarea>
            </div>
            <button className="btn btn-primary mx-2" onClick={handleUpclick}>
                UpperCase
            </button>
            <button className="btn btn-primary mx-2" onClick={handleUpclick1}>
                LowerCase
            </button>
            <button className="btn btn-primary mx-2" onClick={handleClear}>
                Clear
            </button>
            <button className="btn btn-primary mx-2" onClick={findUrl}>
                FindUrl
            </button>
            <div className="container my-3">
                <h1>Your text summary</h1>
                <p>
                    {text === "" ? 0 : text.trim().split(/\s+/).length} words and{" "}
                    {text.length} characters
                </p>
                <p>{minutesRead} Minutes Read</p>
                {alert && (
                    <Alert
                        alert={{
                            type: alert.type,
                            msg: alert.msg,
                        }}
                        onClose={closeAlert}
                    />
                )}
                {foundUrls.length > 0 && (
                    <div>
                        <h2>Found URLs:</h2>
                        <ul>
                            {foundUrls.map((url, index) => (
                                <li key={index}>{url}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {foundEmails.length > 0 && (
                    <div>
                        <h2>Found Emails:</h2>
                        <ul>
                            {foundEmails.map((email, index) => (
                                <li key={index}>{email}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : "Enter something in the textbox to preview it here."}</p>
            </div>
        </div>
    );
}
