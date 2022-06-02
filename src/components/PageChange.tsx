import { useEffect } from 'react';

// routing
import { useLocation } from 'react-router-dom';

// store
import { useStore } from '../store/useStore';
import { CLOSE_NAV } from '../store/actions';

/**
 * Utility component that closes the nav whenever the user changes pages.
 */
export const PageChange = () => {
  const { pathname } = useLocation();
  const { dispatch } = useStore();
  useEffect(() => {
    dispatch({ type: CLOSE_NAV, payload: false });
  }, [pathname, dispatch]);

  return null;
};

export default PageChange;
