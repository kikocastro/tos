module.exports = function(db, BasicDao) {
  var fields = [
		"descricao",
		"preco"
	];

  return new BasicDao({tableName: "tipos_de_servico", fieldNames: fields, db: db});
};
