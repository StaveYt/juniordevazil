import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import Navbar from "./Navbar";

function AboutUs(props) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Upiti se spremaju na firebase za administratore da vide
    await addDoc(collection(db, "Upiti"), data);

    console.log("Upit uspješno poslan");
    window.location.reload();
  };
  const checkAdmin = () => {
    if (userInfo.userType == "admin") {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div>
      <Navbar admin={checkAdmin} />

      <div className="container">
        <h2>Kontaktiraj naš tim!</h2>

        <br />
        <br />
        <div className="info-container">
          <p>Email: </p>
          <a href="mailto:azilzivotinjesplit001@gmail.com">
            azilzivotinjesplit001@gmail.com
          </a>
          <p>Telefonski broj: </p>
          <a href="tel:+385996379852">+385 99 6379 852</a> <br />
          <br />
          <a href="twitter.com">Twitter</a> <br />
          <a href="instagram.com">Instagram</a> <br />
          <a href="facebook.com">Facebook</a> <br />
        </div>

        <br />
        <div className="sub-main-container">
          <iframe
            id="google-maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2751424.973836109!2d10.706122026392375!3d47.66619207163909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d079b259d2a7f%3A0x1012d47bdde4c1af!2sAustrija!5e0!3m2!1shr!2shr!4v1682890478856!5m2!1shr!2shr"
            width="400"
            height="300"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="kontakt-holder">
            <h3>Kontaktiraj nas!</h3> <br />
            <form
              className="form-holder-contact"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-row">
                <div className="form-column">
                  <label className="label-contact" htmlFor="first-name">
                    Vaše ime
                  </label>
                  <input
                    className="input-contact"
                    type="text"
                    id="first-name"
                    name="first-name"
                    placeholder="..."
                    {...register("userName")}
                    required
                  />
                </div>
                <div className="form-column">
                  <label htmlFor="last-name">Vaše prezime</label>
                  <input
                    style={{ marginTop: "6px" }}
                    className="input-contact"
                    type="text"
                    id="last-name"
                    name="last-name"
                    placeholder="..."
                    {...register("userLastName")}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-column">
                  <label htmlFor="contact-number">Vaš kontakt broj</label>
                  <input
                    className="input-contact"
                    type="tel"
                    id="contact-number"
                    name="contact-number"
                    placeholder="..."
                    {...register("userNumber")}
                    required
                  />
                </div>
                <div className="form-column">
                  <label htmlFor="contact-email">
                    Vaša kontakt email adresa
                  </label>
                  <input
                    className="input-contact"
                    type="email"
                    id="contact-email"
                    name="contact-email"
                    placeholder="..."
                    {...register("userEmail")}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <label htmlFor="contact-message">Vaš upit</label>
                <textarea
                  className="input-contact"
                  id="contact-message"
                  name="contact-message"
                  placeholder="..."
                  {...register("userMessage")}
                  required
                ></textarea>
              </div>
              <div className="form-row">
                <button type="submit">Pošalji upit</button>
              </div>
            </form>
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
}

export default AboutUs;
