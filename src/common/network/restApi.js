async function attendre(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function initUser() {
  return {
    pseudo: 'pseudo',
  };
}

export async function login(email) {
  return {
    pseudo: 'pseudo',
    email,
    avatar: 'null',
  };
}
