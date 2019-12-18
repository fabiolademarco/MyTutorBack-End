/*
+create(b : Bando): boolean
+update(b : Bando): Bando
+setStatus(b : Bando, status : int): boolean
+delete(b : Bando): boolean
+search(filter : string): List<Bando>
+find(protocollo : string): Bando
+findAll(): List<Bando>
+getFileBando(protocollo : string): File
+setFileBando(protocollo : string, f : File): File
+getFileGraduatoria(protocollo : string): File
+setFileGraduatoria(protocollo : string, f : File): boolean
+generateBandoPdf(protocollo : string): boolean
+generateGraduatoriaPdf(protocollo : string): boolean
*/

const app = require('../index');

const noticeControl = require('../controllers/noticeController');