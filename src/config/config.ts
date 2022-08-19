interface IENV {
  BASE_URL?: string;
}

const ENV: IENV = {
  BASE_URL: process.env.REACT_APP_BASE_URL,
};

export default ENV;
