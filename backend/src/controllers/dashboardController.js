async function getSummary(_request, reply) {
  return reply.send({
    stats: [
      { label: "Afiliados ativos", value: 27 },
      { label: "Comissões pendentes", value: "€ 4.390,00" },
      { label: "Conversões hoje", value: 13 }
    ]
  });
}

module.exports = {
  getSummary
};
