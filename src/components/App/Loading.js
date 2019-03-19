import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = () => {
  return ( 
    <FontAwesomeIcon className="loading-spinner" icon={faSpinner}/>
   );
}
 
export default Loading;