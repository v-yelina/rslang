const getAuthHeader = () => {
  const userString = localStorage.getItem('user');
  if ( userString ) {
    const user = JSON.parse(userString);
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
}

export default getAuthHeader;
