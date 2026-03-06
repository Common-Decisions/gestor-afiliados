function ensureAuthenticated(request, reply, done) {
  if (!request.session.user) {
    return reply.status(401).send({ message: "Não autenticado." });
  }
  done();
}

module.exports = {
  ensureAuthenticated
};
