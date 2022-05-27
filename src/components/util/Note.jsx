import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import { wrapper, heading, text } from './Note.module.scss';

const Note = ({ children }) => {
  return (
    <div className={wrapper}>
      <p className={heading}>
        <b>
          <FontAwesomeIcon icon={faBookReader} /> Note
        </b>
      </p>
      <p className={text}>{children}</p>
    </div>
  );
};

export default Note;
