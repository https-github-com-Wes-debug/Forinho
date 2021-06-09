const INITIAL_STATE = {
  usuarioName: '',
  usuarioUsername: '',
  usuarioLogado: 0,
  usuarioAvatar: '',
  usuarioEmail: '',
};

function usuarioReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        usuarioLogado: 1,
        usuarioName: action.usuarioName,
        usuarioUsername: action.usuarioUsername,
        usuarioAvatar: action.usuarioAvatar,
        usuarioEmail: action.usuarioEmail,
      };
    case 'LOG_OUT':
      return {
        ...state,
        usuarioLogado: 0,
        usuarioName: '',
        usuarioUsername: '',
        usuarioAvatar: '',
        usuarioEmail: '',
      };
    default:
      return state;
  }
}
export default usuarioReducer;
