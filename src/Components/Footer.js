import "./Footer.scss";
import moment from 'moment';

function Footer() {
  return (
    <>
        <div className="d-buttons">
          <div className="c-btn">Contour</div>
          <div className="s-btn">Surf</div>
          <div className="p-btn">Plot2d</div>
          <div className="e-btn">Export</div>
        </div>
        <div className="footer">
            <div className="text">Weapons Electronics & Systems Engineering Establishment (WESEE)</div>
            <div className="date">{moment().format('DD-MM-yyyy hh:mm A')}</div>
        </div>
    </>
  );
}
export default Footer;
