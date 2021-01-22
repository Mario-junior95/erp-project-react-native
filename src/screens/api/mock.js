const mockSuccess = (value) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), 2000);
  });
};

const mockFailure = (value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(value), 2000);
  });
};

export const login = (username, password, shouldSucceed = true) => {
  console.log(username, password);

  if (!shouldSucceed) {
    return mockFailure({ error: 500, message: "Something went wrog!" });
  }

  return mockSuccess({ auth_token: "successful_fake_token" });
};



const getAuth = () => 'successful_fake_token';

export const getUsers = (shouldSucceed = true) => {
    const token = getAuth();
}
