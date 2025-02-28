var date = new Date()
var CandidaName = context.variableManager.getValue("VE_candidates.Nombre");
var CurrentDate = context.variableManager.getValue("VE_date");
var Id = context.variableManager.getValue("VE_id");
var filePath = 'C:\\Users\\bumanag\\Documents\\Practica_Performance\\Neoload\\Recording\\results\\Recording_' + CurrentDate + '.txt';
var txtFile = new java.io.FileWriter(filePath, true);

txtFile.write(date.toString() +  "; " +   "Nombre del candidato: " + CandidaName + "; " + "Id del candidato: " + Id + "\n");
txtFile.close();