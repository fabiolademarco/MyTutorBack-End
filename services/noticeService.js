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
const NoticeControl = require('../controllers/noticeControl');

module.exports = (app) => {
  app.put('/api/notice/create', NoticeControl.create);
  app.get('/api/notice/update', NoticeControl.update);
  app.put('/api/notice/set_status', NoticeControl.setStatus);
  app.get('/api/notice/delete', NoticeControl.delete);
  app.get('/api/notice/search', NoticeControl.search);
  app.get('/api/notice/all', NoticeControl.findAll);
  app.get('/api/notice/protocol', NoticeControl.find);
  app.get('/api/notice/download_notice', NoticeControl.downloadNotice);
  app.put('/api/notice/upload_notice', NoticeControl.uploadNotice);
  app.get('/api/notice/download_graded_list', NoticeControl.downloadGradedList);
  app.put('/api/notice/upload_graded_list', NoticeControl.uploadGradedList);
};
