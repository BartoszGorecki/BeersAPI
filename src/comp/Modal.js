import React from "react";
import ReactDOM from "react-dom";
import Spinner from "./Spinner";
import { truncWords } from '../Helpers'
import "../style/Modal.css";

const Modal = ({
  selected: [
    { name, tagline, image_url, abv, ibu, ebc, description, food_pairing }
  ],
  ...rest
}) => {
  return ReactDOM.createPortal(
    <aside className="modal-cover" tabIndex="0">
      <div
        className="modal-content"
        aria-modal="true"
        tabIndex="-1"
        aria-label={rest.ariaLabel}
      >
        <div className="modal-content2">
          <button
            className="modal-close"
            onClick={rest.closeModal}
            aria-label="Close Modal"
          >
            <span className="hide-visually">Close</span>
            <svg className="modal-close-icon" viewBox="0 0 40 40">
              <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </button>
          <div className="modal-top">
            <div
              className="modal-image"
              style={{ background: `url(${image_url})` }}
            />
            <div className="modal-allinfo">
              <div className="modal-name" style={{ fontSize: name.split` `.length > 4 ? '20px' : '30px'}}>{name}</div>
              <div className="modal-desc">
              {tagline}
              <span></span>
              </div>
              <div className="modal-desc2">
                <span>
                  <span>IBU:</span>
                  {ibu}
                </span>
                <span>
                  <span>ABV:</span>
                  {abv}%
                </span>
                <span>
                  <span>EBC:</span>
                  {ebc}
                </span>
              </div>
              <article className="modal-info">
                <section style={{ fontSize: description.split` `.length > 50 ? '10px' : '15px' }}>{description}</section>
                <br />
                <section>
                  <h5>Best serverd with:</h5>
                  <ul>
                    {food_pairing.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                </section>
              </article>
            </div>
          </div>
          <div className="modal-bottom">
            <h5>You might also like:</h5>
            <div className="modal-bottom-content">
              {rest.similar.map(({ id, name, image_url }) => {
                return (
                  <div key={id} className="modal-bottom-item">
                    <div
                      className="modal-bottom-image"
                      style={{ background: `url(${image_url})` }}
                    >{image_url === null && 'No image in database!'}</div>
                    <div className='modal-bottom-text'>{truncWords(name, 9)}</div>
                  </div>
                );
              })}
              {rest.similar.length > 0 && rest.loadingSimilar && <Spinner />}
              {rest.similar.length === 0 && (!rest.loadingSimilar || rest.error) && (
                <div className="error">
                  We are sorry, but there are no similar drunks!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>,
    document.body
  );
};
export default Modal;
