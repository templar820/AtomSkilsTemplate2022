import SessionFileStore from 'session-file-store';
import session from 'express-session';

const Store = SessionFileStore(session);
const SessionStore = new Store();

export default SessionStore;
