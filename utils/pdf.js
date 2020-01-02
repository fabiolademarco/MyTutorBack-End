const Notice = require('../models/notice');
const Assignment = require('../models/assignment');
const noticeLayout = require('../static/notice.json');
const personalData = require('../static/personal_data_treatment');

const fs = require('fs');
const path = require('path');
const merge = require('easy-pdf-merge');
const pdf = require('pdfjs');

const times = require('pdfjs/font/Times-Roman');
const timesBold = require('pdfjs/font/Times-Bold');

const cm = pdf.cm;

const _ = (...objects) => Object.assign({}, ...objects);

const justify = {textAlign: 'justify'};
const center = {textAlign: 'center'};
const right = {textAlign: 'right'};
const underlined = {underline: true};
const bold = {font: timesBold};
const paddingTop = (centimeters) => {
  return {paddingTop: centimeters*cm};
};
const paddingBottom = (centimeters) => {
  return {paddingBottom: centimeters*cm};
};
const paddingLeft = (centimeters) => {
  return {paddingLeft: centimeters*cm};
};
const padding = (centimeters) => {
  return {padding: centimeters*cm};
};


const generateNotice = async (notice) => {
  const filePath = `../notices/temp_${notice.protocol}.pdf`;

  if (!fs.existsSync('../notices')) {
    fs.mkdirSync('../notices');
  }

  const documentOptions = {
    font: times,
    fontSize: 11,
    paddingLeft: 1.7*cm,
    paddingRight: 1.7*cm,
    paddingTop: 0.5*cm,
    paddingBottom: 1*cm,
    properties: {
      author: 'Unisa',
    },
  };

  const doc = new pdf.Document(documentOptions);
  doc.pipe(fs.createWriteStream(filePath));

  // Header

  const logo = new pdf.Image(fs.readFileSync('../static/logo.jpg'));
  const header = doc.header();
  header.cell(_(paddingBottom(1))).image(logo, {height: 2*cm});

  // Footer

  const footer = doc.footer().table({widths: [null, null, null]}).row();
  noticeLayout.footer.forEach((element, index) => {
    footer.cell({fontSize: 6}).text(element);
  });


  // Descrizione

  doc.cell(_(paddingBottom(1)))
      .text(notice.description, _(justify, bold));
  doc.cell(_(paddingBottom(0.5)))
      .text(noticeLayout.director, _(center, bold));

  // Articoli

  const articlesTable = doc.table(_({widths: [3*cm, null]}, paddingBottom(0.5), center));
  notice.articles.forEach((article) => {
    const row = articlesTable.row(_(justify));
    row.cell().text(article.initial, _(bold));
    row.cell().text(article.text);
  });

  // Art. 1 - Oggetto del bando

  doc.cell(_(paddingBottom(0.5)))
      .text(noticeLayout.decrees, _(center, bold));

  doc.cell(_(paddingBottom(0.5)))
      .text(noticeLayout.art1.title, _(bold));
  doc.cell(_(paddingBottom(0.5)))
      .text(notice.notice_subject, _(justify));

  // Tabella Incarichi

  let assignmentsTable;
  if (notice.type === Notice.Types.HELP_TEACHING) {
    assignmentsTable = doc.table({
      widths: [1.5*cm, 1.5*cm, null, null, 2*cm, 3*cm, 3*cm],
      borderWidth: 1,
    });
    const th = assignmentsTable.header(_(bold, padding(0.1)));
    noticeLayout.art1.tableHeader.helpTeaching.forEach((el) => th.cell().text(el));
  } else {
    assignmentsTable = doc.table({
      widths: [1.5*cm, 1.5*cm, null, null, 2*cm, 3*cm],
      borderWidth: 1,
    });
    const th = assignmentsTable.header(_(bold, padding(0.1)));
    noticeLayout.art1.tableHeader.tutoring.forEach((el) => th.cell().text(el));
  }

  notice.assignments.forEach((assignment) => {
    const row = assignmentsTable.row(_(padding(0.1)));
    row.cell().text(assignment.code);
    row.cell().text(assignment.total_number_hours + '');
    row.cell().text(assignment.activity_description);
    row.cell().text(assignment.title === Assignment.titles.PHD ? 'Dottorando' : 'Studente laurea Magistrale');
    row.cell().text(assignment.hourly_cost + ' €');
    row.cell().text(assignment.hourly_cost*assignment.total_number_hours + ' €');
    if (notice.type === Notice.Types.HELP_TEACHING) {
      row.cell().text(assignment.ht_fund);
    }
  });

  // Art. 2 - Requisiti di ammissione
  doc.cell(_(paddingBottom(0.5), paddingTop(0.5)))
      .text(noticeLayout.art2.title, _(bold));
  doc.cell(_(paddingBottom(0.5)))
      .text(notice.admission_requirements, _(justify));

  // Art. 3 - Modalità di presentazione delle domande
  doc.cell(_(paddingBottom(0.5)))
      .text(noticeLayout.art3.title, _(bold));
  doc.cell(_(paddingBottom(0.5)))
      .text(notice.how_to_submit_applications, _(justify));

  // Art. 4 - Titoli valutabili e preferenziali
  doc.cell(_(paddingBottom(0.5)))
      .text(noticeLayout.art4.title, _(bold));
  doc.cell(_(paddingBottom(0.5)))
      .text(notice.assessable_titles, _(justify));

  // Art. 5 - Commissione giudicatrice
  doc.cell(_(paddingBottom(0.5)))
      .text(noticeLayout.art5.title, _(bold));
  doc.cell(_(paddingBottom(0.5)))
      .text(notice.selection_board, _(justify));

  // Art. 6 - Criteri di selezione
  doc.cell(_(paddingBottom(0.5)))
      .text(noticeLayout.art6.title, _(bold));
  doc.cell(_(paddingBottom(0.5)))
      .text(notice.selection_board, _(justify));

  // Art. 7 - Accettazione dell'incarico e modalità di svolgimento delle attività
  doc.cell(_(paddingBottom(0.5)))
      .text(noticeLayout.art7.title, _(bold));
  doc.cell(_(paddingBottom(0.5)))
      .text(notice.acceptance, _(justify));

  // Art. 8 - Incompatibilità
  doc.cell(_(paddingBottom(0.5)))
      .text(noticeLayout.art8.title, _(bold));
  doc.cell(_(paddingBottom(0.5)))
      .text(notice.incompatibility, _(justify));

  // Art. 9 - Cessazione dell'incarico e rinuncia
  doc.cell(_(paddingBottom(0.5)))
      .text(noticeLayout.art9.title, _(bold));
  doc.cell(_(paddingBottom(0.5)))
      .text(notice.termination_of_the_assignment, _(justify));

  // Art. 10 - Natura dell'incarico
  doc.cell(_(paddingBottom(0.5)))
      .text(noticeLayout.art10.title, _(bold));
  doc.cell(_(paddingBottom(0.5)))
      .text(notice.nature_of_the_assignment, _(justify));

  // Art. 11 - Borse non utilizzate
  doc.cell(_(paddingBottom(0.5)))
      .text(noticeLayout.art11.title, _(bold));
  doc.cell(_(paddingBottom(0.5)))
      .text(notice.unused_funds, _(justify));

  // Art. 12 - Responsabile del procedimento
  doc.cell(_(paddingBottom(0.5)))
      .text(noticeLayout.art12.title, _(bold));
  doc.cell(_(paddingBottom(0.5)))
      .text(notice.responsible_for_the_procedure, _(justify));

  // Art. 13 - Trattamento dei dati personali dei candidati
  doc.cell(_(paddingBottom(0.5)))
      .text(noticeLayout.art13.title, _(bold));
  doc.cell(_(paddingBottom(0.5)))
      .text(noticeLayout.art13.body, _(justify));

  // Ratifica
  doc.cell( _(paddingBottom(1)))
      .text(noticeLayout.ratification);

  // const director = await User.findByRole(User.Role.DDI)[0];

  const signTable = doc.table({widths: [null, null]}).row();
  signTable.cell().text('');
  signTable.cell().text(_(center))
      .add(noticeLayout.sign);
  // .add(director.name + ' ' + director.surname);


  await doc.end();
  return filePath;
};


const generatePersonalDataTreatment = async () => {
  const filePath = '../static/personal_data_treatment.pdf';
  if (fs.existsSync(filePath)) {
    return filePath;
  }

  const documentOptions = {
    font: times,
    fontSize: 11,
    padding: 1.7*cm,
    properties: {
      author: 'Unisa',
    },
  };

  const doc = new pdf.Document(documentOptions);
  doc.pipe(fs.createWriteStream(filePath));

  doc.text(personalData.title, _(bold, justify));
  doc.text(personalData.subject, _(justify));

  personalData.contents.forEach((el) => {
    doc.text(el.title, _(bold, underlined));
    doc.text(el.body, _(justify));
  });

  doc.text(personalData.listTitle, _(bold));

  personalData.list.forEach((el) => {
    if (el instanceof Array) {
      el.forEach((el) => {
        doc.cell(_(paddingLeft(1)))
            .text(el, _(paddingLeft(1), justify));
      });
    } else {
      doc.cell(_(paddingLeft(0.5)))
          .text(el, _(justify));
    }
  });

  await doc.end();
  return filePath;
};

const generateApplicationSheet = async (notice) => {
  const applicationSheetLayout = require('../static/application_sheet');

  const filePath = `../notices/temp_${notice.protocol}_application_sheet.pdf`;

  const documentOptions = {
    font: times,
    fontSize: 11,
    paddingTop: 1.3*cm,
    paddingBottom: 1.3*cm,
    paddingRight: 1.7*cm,
    paddingLeft: 1.7*cm,
    properties: {
      author: 'Unisa',
    },
  };

  const doc = new pdf.Document(documentOptions);
  doc.pipe(fs.createWriteStream(filePath));

  const assignments = notice.assignments;
  const masterAssignments = [];
  const phdAssignments = [];

  for (const assignment of assignments) {
    if (assignment.title === Assignment.titles.MASTER) {
      masterAssignments.push(assignments);
    } else {
      phdAssignments.push(assignments);
    }
  }

  for (let i = 0; i < 2; i++) {
    if ((i == 0 && masterAssignments.length > 0 || i == 1 && phdAssignments.length > 0)) {
      if (i == 1 && masterAssignments.length > 0) {
        doc.pageBreak();
      }

      doc.cell(_(paddingBottom(1))).text(_(center, bold))
          .add(i == 0 ? applicationSheetLayout.titleMaster : applicationSheetLayout.titlePhd)
          .add(notice.protocol);
      doc.cell(_(paddingBottom(0.5)))
          .text(applicationSheetLayout.to, _(right));
      doc.cell()
          .text(applicationSheetLayout.subscription, _(justify, {lineHeight: 1.5}));
      doc.cell(_(paddingTop(0.5), paddingBottom(0.5)))
          .text(applicationSheetLayout.asks, _(center, bold));
      doc.cell().text(_(justify))
          .add(applicationSheetLayout.admission1)
          .add(phdAssignments.length)
          .add(applicationSheetLayout.admission2);
      doc.cell(_(paddingBottom(0.5)))
          .text(applicationSheetLayout.assignNo);

      const actualAssignments = i == 0 ? masterAssignments : phdAssignments;
      actualAssignments.forEach((assignment) => {
        doc.cell(paddingLeft(0.5)).text()
            .add('o  ')
            .add('Cod. ')
            .add(assignments.code, _(bold));
      });

      doc.cell(_(paddingTop(0.5)))
          .text(applicationSheetLayout.info, _(justify));
      doc.cell(_(paddingTop(0.5), paddingBottom(0.5)))
          .text(applicationSheetLayout.declares, _(center, bold));

      const actualDeclaration = i == 0 ? applicationSheetLayout.declarationsMaster : applicationSheetLayout.declarationsPhd;
      actualDeclaration.forEach((declaration) => {
        doc.text(declaration);
      });

      doc.cell(_(paddingTop(0.5)))
          .text(applicationSheetLayout.personalData);
      doc.cell(_(paddingLeft(0.5), paddingBottom(1)))
          .text(notice.application_sheet.documents_to_attach);

      const table = doc.table({widths: [null, null]}).row();
      table.cell().text('Data');
      table.cell().text('Firma', _(center));
    }
  }

  await doc.end();
  return filePath;
};


exports.makeNotice = async (notice) => {
  const noticePath = await generateNotice(notice);
  const pdtPath = await generatePersonalDataTreatment();
  const applicationSheetPath = await generateApplicationSheet(notice);

  const filePath = `../notices/${notice.protocol}.pdf`;

  merge([noticePath, pdtPath, applicationSheetPath], filePath, (err) => {
    if (err) {
      console.log(err);
    }
    fs.unlink(noticePath, () => {
      console.log(`Temporary file '${noticePath}' deleted`);
    });
    fs.unlink(applicationSheetPath, () => {
      console.log(`Temporary file '${applicationSheetPath}' deleted`);
    });
  });

  return path.resolve(filePath);
};
