interface IENV {
  BASE_URL: string;
  WORDS_URL: string;
  USERS_URL: string;
}

const ENV: IENV = {
  BASE_URL: process.env.REACT_APP_BASE_URL!,
  WORDS_URL: `${process.env.REACT_APP_BASE_URL}words`,
  USERS_URL: `${process.env.REACT_APP_BASE_URL}users`,
};

export default ENV;
