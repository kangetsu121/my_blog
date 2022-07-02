import { FunctionComponent } from 'react';
import { FaBookReader } from 'react-icons/fa';
import { wrapper, heading, text } from './Note.module.scss';

const Note: FunctionComponent = ({ children }) => {
  return (
    <div className={wrapper}>
      <p className={heading}>
        <b>
          <FaBookReader /> Note
        </b>
      </p>
      <p className={text}>{children}</p>
    </div>
  );
};

export default Note;
