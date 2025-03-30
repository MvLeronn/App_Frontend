// Função para pegar o token do header
const getToken = (req) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  return token;
};

module.exports = getToken;
