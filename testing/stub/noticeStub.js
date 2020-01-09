const ApplicationSheet = require('./applicationSheetStub');
const EvaluationCriterion = require('./evaluationCriterionStub');
const Article = require('./articleStub');
const Assignment = require('./assignmentStub');
const Comment = require('./commentStub');

const notices = [
  {
    protocol: 'Prot. n. 0279008',
    referent_professor: null,
    admission_requirements: 'Sono ammessi alla selezione gli studenti regolarmente iscritti al corso di Laurea Magistrale in Informatica (LM18) dell\'Università degli Studi di Salerno.',
    description: 'AVVISO DI SELEZIONE PER TITOLI PER L\'ATTRIBUZIONE DI No. 8 ASSEGNI PER LO SVOLGIMENTO DI ATTIVITÀ DI SUPPORTO ALLA DIDATTICA PER STUDENTI DIVERSAMENTE ABILI.',
    notice_subject: 'È indetta, per l\'anno accademico 2019/2020, una selezione, per titoli e colloquio, per l\'assegnazione di complessivi n. 8 (otto) assegni di cui n. 2 (due) da 26 ore, n. 2 (due) da 20 ore, n. 2 (due) da 18 ore n. 2 (due) da 10 ore, per lo svolgimento di attività di supporto alla didattica per studenti diversamente abili e con DSA. In particolare il destinatario dell\'incarico dovrà offrire tutoraggio specializzato relativamente agli insegnamenti del corso di Laurea in Informatica (triennale). Gli assegni prevedono un compenso lordo percipiente orario di € 25,00 (euro venticinque/00) pari ad un compenso lordo percipiente complessivo di € 650,00 (euro seicentocinquanta/00) per gli assegni da 26 ore, € 500,00 (euro cinquecento/00) per gli assegni da 20 ore, € 450,00 (euro quattrocentocinquanta/00) per gli assegni da 18 ore e € 250,00 (euro duecentocinquanta/00) per gli assegni da 10 ore',
    assessable_titles: null,
    how_to_submit_applications: 'Le domande di partecipazione alla selezione, redatte in carta libera secondo il fac-simile allegato, dovranno essere indirizzate al Direttore del Dipartimento di Informatica ed essere presentate, esclusivamente a mano all\'Ufficio Didattica, Organi Collegiali, Alta Formazione, Carriere del Dipartimento di Informatica - via Giovanni Paolo Il 132-84084 Fisciano-piano IV-stecca VII- dal lunedì al venerdì dalle ore 09:30 alle ore 13:00, entro il termine perentorio del 25/10/2019 ore 13:00. Alla domanda dovrà essere allegata la seguente documentazione: a) dichiarazione sostitutiva di certificazione, resa ai sensi del D.P.R. 445/2000, relativa all\'avvenuto conseguimento del diploma di laurea di primo livello, alla votazione finale riportata ed alla data del suo conseguimento; b) dichiarazione sostitutiva di certificazione, resa ai sensi del D.P.R. 445/2000, relativa all\'iscrizione al Corso di Laurea Magistrale c) dichiarazione sostitutiva di certificazione, resa ai sensi del D.P.R. 445/2000, relativa ad altri titoli che si ritengono utili ai fini della selezione; d) copia di un valido documento di riconoscimento.',
    selection_board: 'Il conferimento degli assegni per l\'attività di tutorato avverrà sulla base di una selezione, per titoli e colloquio, operata da una Commissione giudicatrice, composta da 3 componenti nominati dal Direttore del Dipartimento di informatica. La Commissione giudicatrice prenderà in esame esclusivamente le domande dei candidati che siano in possesso dei requisiti di cui all\'Art. 2. I colloqui avranno luogo il giorno 30/10/2019 alle ore 16:15 presso la Sala Riunioni del Dipartimento di Informatica dell\'Università degli Studi di Salerno (Stanza 95 - stecca 7 - IV piano). La Commissione giudicatrice si riserva, inoltre, la possibilità di stabilire ulteriori date che verranno pubblicate sul sito web di Ateneo. Il presente bando, pertanto, è da considerarsi a tutti gli effetti quale convocazione.',
    acceptance: 'Per l\'affidamento delle attività di cui al presente bando sarà comunicata la convocazione per la stipula del contratto di collaborazione. Colui che non si presenterà nei giorni utili indicati sarà automaticamente considerato rinunciatario. I candidati selezionati dovranno dichiarare la propria disponibilità per tutto il periodo previsto per l\'attività di tutorato e di essere liberi da impegni o di non incorrere in incompatibilità che possano impedire una fattiva presenza e reperibilità all\'interno della struttura universitaria. L\'attività dei tutor sarà svolta sotto il coordinamento del Delegato alla Disabilità del Dipartimento di Informatica. L\'attività del tutor dovrà terminare non oltre il 31 ottobre 2020. Gli orari di svolgimento delle attività di tutorato dovranno essere concordati con il Delegato alla Disabilità del Dipartimento di Informatica, al fine di garantire agli studenti l\'effettiva fruibilità del servizio. Il compenso previsto per ciascun assegno verrà corrisposto al termine dell\'incarico previa valutazione positiva dell\'operato del tutor da parte del Delegato alla Disabilità del Dipartimento di Informatica. Entro 7 giorni dal termine dell\'incarico il tutor è tenuto a compilare un registro delle attività svolte da restituire all\'Ufficio Didattica 1, Organi collegiali, Alta formazione, Carriere CDS/DI del Dipartimento accompagnato da una relazione, controfirmata dal Delegato alla Disabilità del Dipartimento di Informatica.',
    incompatibility: 'L\'assegno è compatibile con la fruizione di borse di studio; è incompatibile, a pena di decadenza, con le attività di collaborazione a tempo parziale (150 ore), con la partecipazione a Programmi comunitari di mobilità all\'estero o soggiorni di studio all\'estero. Gli studenti che, nel periodo di svolgimento delle attività in oggetto, dovessero conseguire il Diploma di Laurea Magistrale decadono dall\'incarico.',
    termination_of_the_assignment: 'L\'incarico cessa nei seguenti casi: rinuncia del collaboratore; irrogazione di un provvedimento disciplinare: compimento di atti che, a insindacabile giudizio del Direttore, su segnalazione del Delegato alla Disabilità del Dipartimento di Informatica o degli utenti, risultino incompatibili con le finalità della collaborazione; - astensione ingiustificata dalla collaborazione; - conseguimento titolo di laurea magistrale In caso di cessazione, al tutor sono corrisposte solo le prestazioni effettivamente svolte come risultanti dal registro delle attività. Il Direttore del Dipartimento di Informatica potrà sostituire il tutor attingendo dalla graduatoria di merito.',
    nature_of_the_assignment: 'Il tutorato non configura in alcun modo un rapporto di lavoro subordinato e non comporta l\'integrazione dei collaboratori nell\'organizzazione del lavoro dei servizi amministrativi e didattici dell\'Ateneo, né dà luogo ad alcuna valutazione ai fini dei pubblici concorsi. Su richiesta dell\'interessato, alla fine del periodo di tutorato, sarà rilasciato dall\'Ufficio Didattica, Organi Collegiali, Alta Formazione, Carriere del Dipartimento di Informatica dell\'Università degli Studi di Salerno una certificazione attestante l\'attività svolta.',
    unused_funds: 'Eventuali borse non attribuite potranno essere utilizzate dal Dipartimento di Informatica su indicazione della Commissione giudicatrice, assegnando ulteriori assegni sempre seguendo le singole graduatorie distribuendo le ore previste tra le borse assegnate. In tal caso verrà rimodulato il numero di ore e l\'importo economico (in misura di 25,00 euro/ora) di ciascuna delle borse assegnate.',
    responsible_for_the_procedure: 'Il responsabile del procedimento amministrativo di cui al presente bando, ai sensi degli artt. 4, 5 e 6 della legge 7 agosto 1990, n. 241 e s.m.i., è la dott.ssa Carmela De Rosa - Capo Ufficio didattica, organi collegiali, alta formazione, carriere - CdS/DI.',
    notice_funds: '3700',
    state: 'Draft',
    type: 'Tutorato',
    deadline: '2019-12-31 ',
    notice_file: null,
    graded_list_file: null,
  },
];


/**
 * Enum for all possible states of a notice
 * @readonly
 * @enum {string}
 */
const States = {
  DRAFT: 'Draft',
  IN_ACCEPTANCE: 'In Acceptance',
  ACCEPTED: 'Accepted',
  IN_APPROVAL: 'In Approval',
  APPROVED: 'Approved',
  PUBLISHED: 'Published',
  EXPIRED: 'Expired',
  WAITING_FOR_GRADED_LIST: 'Waiting for Graded List',
  CLOSED: 'Closed',
};

/**
 * Enum for all possible types of a notice
 * @readonly
 * @enum {string}
 */
const Types = {
  HELP_TEACHING: 'Help Teaching',
  TUTORING: 'Tutoring',
};

/**
 * NoticeStub
 *
 * This class represents a NoticeStub
 *
 * @author Roberto
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */
class Notice {
  /**
   * Notice object constructor
   * @param {Notice} notice The JS object that contains fields for setting new Notice object
   */
  constructor(notice) {
    this.protocol = notice.protocol;
    this.referent_professor = notice.referent_professor;
    this.description = notice.description;
    this.notice_subject = notice.notice_subject;
    this.admission_requirements = notice.admission_requirements;
    this.assessable_titles = notice.assessable_titles;
    this.how_to_submit_applications = notice.how_to_submit_applications;
    this.selection_board = notice.selection_board;
    this.acceptance = notice.acceptance;
    this.incompatibility = notice.incompatibility;
    this.termination_of_the_assignment = notice.termination_of_the_assignment;
    this.nature_of_the_assignment = notice.nature_of_the_assignment;
    this.unused_funds = notice.unused_funds;
    this.responsible_for_the_procedure = notice.responsible_for_the_procedure;
    this.notice_funds = notice.notice_funds;
    this.state = Object.values(States).includes(notice.state) ? notice.state : null;
    this.type = Object.values(Types).includes(notice.type) ? notice.type : null;
    this.deadline = notice.deadline;
    this.notice_file = notice.notice_file;
    this.graded_list_file = notice.graded_list_file;
    this.articles = notice.articles ? notice.articles.map((art) => new Article(art)) : null;
    this.evaluation_criteria = notice.evaluation_criteria ? notice.evaluation_criteria.map((ec) => new EvaluationCriterion(ec)) : null;
    this.application_sheet = notice.application_sheet ? new ApplicationSheet(notice.application_sheet) : null;
    this.assignments = notice.assignments ? notice.assignments.map((assign) => new Assignment(assign)) : null;
    this.comment = notice.comment ? new Comment(notice.comment) : null;
  }

  /**
   * Creates a new notice in database.
   * @param {Notice} notice The notice to save.
   * @return {Promise<Notice>} Promise that represents the created Notice
   */
  static async create(notice) {
    if (!notice) {
      throw new Error('No Parameters');
    }

    const articles = JSON.parse(JSON.stringify(notice.articles));
    const evaluationCriteria = JSON.parse(JSON.stringify(notice.evaluation_criteria));
    const assignments = JSON.parse(JSON.stringify(notice.assignments));
    const applicationSheet = JSON.parse(JSON.stringify(notice.application_sheet));

    delete notice.articles;
    delete notice.evaluation_criteria;
    delete notice.assignments;
    delete notice.application_sheet;
    delete notice.comment;

    return new Promise((resolve) => resolve())
        .then(() => {
          notices.push(notice);
        })
        .then(() => {
          if (articles) {
            articles.forEach((art) => Article.create(art));
          }
        })
        .then(() => {
          if (evaluationCriteria) {
            evaluationCriteria.forEach((ec) => EvaluationCriterion.create(ec));
          }
        })
        .then(() => {
          if (assignments) {
            assignments.forEach((assign) => Assignment.create(assign));
          }
        })
        .then(() => {
          if (applicationSheet) {
            ApplicationSheet.create(applicationSheet);
          }
        })
        .then(() => {
          notice.articles = articles;
          notice.evaluation_criteria = evaluationCriteria;
          notice.assignments = assignments;
          notice.application_sheet = applicationSheet;

          return new Notice(notice);
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Update a notice in database.
   * @param {Notice} notice The notice to update.
   * @return {Promise<Notice>} Promise that represents the updated notice
   */
  static async update(notice) {
    if (!notice) {
      throw new Error('No Parameters');
    }
    if (!await this.exists(notice)) {
      throw new Error('The notice doesn\'t exists');
    }

    const articles = JSON.parse(JSON.stringify(notice.articles));
    const evaluationCriteria = JSON.parse(JSON.stringify(notice.evaluation_criteria));
    const assignments = JSON.parse(JSON.stringify(notice.assignments));
    const applicationSheet = JSON.parse(JSON.stringify(notice.application_sheet));

    delete notice.articles;
    delete notice.evaluation_criteria;
    delete notice.assignments;
    delete notice.application_sheet;
    delete notice.comment;

    return new Promise((resolve) => resolve())
        .then(() => {
          const el = notices.filter((el) => el.protocol === notice.protocol);

          notices[notices.indexOf(el)] = notice;
        })
        .then(() => {
          if (applicationSheet) {
            if (Object.entries(applicationSheet).length != 0) {
              return ApplicationSheet.update(applicationSheet);
            } else {
              return ApplicationSheet.remove(applicationSheet);
            }
          }
        })
        .then(() => {
          if (evaluationCriteria) {
            return EvaluationCriterion.findByNotice(notice.protocol)
                .then((dbEvaluationCriteria) => {
                  if (dbEvaluationCriteria == null || dbEvaluationCriteria.length < 1) {
                    return;
                  }
                  const actions = getActionsToPerform(dbEvaluationCriteria, evaluationCriteria);

                  return Promise.all(performActions(EvaluationCriterion, actions));
                });
          }
        })
        .then(() => {
          if (articles) {
            return Article.findByNotice(notice.protocol)
                .then((dbArticles) => {
                  if (dbArticles == null || dbArticles.length < 1) {
                    return;
                  }
                  const actions = getActionsToPerform(dbArticles, articles);

                  return Promise.all(performActions(Article, actions));
                });
          }
        })
        .then(() => {
          if (assignments) {
            return Assignment.findByNotice(notice.protocol)
                .then((dbAssignments) => {
                  if (dbAssignments == null || dbAssignments.length < 1) {
                    return;
                  }
                  const actions = getActionsToPerform(dbAssignments, assignments);

                  return Promise.all(performActions(Assignment, actions));
                });
          }
        })
        .then(() => {
          notice.articles = articles;
          notice.evaluation_criteria = evaluationCriteria;
          notice.assignments = assignments;
          notice.application_sheet = applicationSheet;

          return new Notice(notice);
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
  }

  /**
   * Removes a notice from database.
   * @param {Notice} notice The notice to remove.
   * @return {Promise<boolean>} Promise that is true if the removal went right else it's false
   */
  static async remove(notice) {
    if (!notice) {
      throw new Error('No Parameters');
    }

    return new Promise((resolve) => resolve())
        .then(() => notices.pop(notice) != null)
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Check if a notice exists.
   * @param {Notice} notice The notice to check.
   * @return {Promise<boolean>} Promise that resolves to true if the notice exists or false if it doesn't exist
   */
  static async exists(notice) {
    if (!notice) {
      throw new Error('No Parameters');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          return notices.filter((el) => el.protocol === notice.protocol).length > 0;
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Finds the notice with the specific protocol.
   * @param {string} noticeProtocol The protocol of the notice.
   * @return {Promise<Notice[]>} Promise that represents the Notices having a protocol LIKE the passed protocol.
   */
  static async findByProtocol(noticeProtocol) {
    if (!noticeProtocol) {
      throw new Error('No Parameters');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          const rows = notices.filter((el) => el.protocol === noticeProtocol);

          return Promise.all(rows.map((notice) =>
            getOtherFields(notice.protocol)
                .then(({assignments, applicationSheet, evaluationCriteria, articles, comment}) => {
                  notice.assignments = assignments;
                  notice.application_sheet = applicationSheet;
                  notice.evaluation_criteria = evaluationCriteria;
                  notice.articles = articles;
                  notice.comment = comment;

                  return new Notice(notice);
                })
                .catch((err) => {
                  throw err;
                }),
          ),
          )
              .catch((err) => {
                throw err;
              });
        });
  }

  /**
   * Finds the notices with the specific state.
   * @param {Notice.States[]} states The states of the notice.
   * @return {Promise<Notice[]>} Promise that represents the Notice array having the passed State.
   */
  static async findByState(states) {
    if (!states) {
      throw new Error('No Parameters');
    }

    let query = `SELECT * FROM ${table} WHERE false`;

    states.forEach((state) => query += ' OR state = ?');

    return new Promise((resolve) => resolve())
        .then(() => {
          const rows = notices.filter((el) => states.includes(el.state));

          return Promise.all(rows.map((notice) =>
            getOtherFields(notice.protocol)
                .then(({assignments, applicationSheet, evaluationCriteria, articles, comment}) => {
                  notice.assignments = assignments;
                  notice.application_sheet = applicationSheet;
                  notice.evaluation_criteria = evaluationCriteria;
                  notice.articles = articles;
                  notice.comment = comment;

                  return new Notice(notice);
                })
                .catch((err) => {
                  throw err;
                }),
          ),
          )
              .catch((err) => {
                throw err;
              });
        });
  }

  /**
   * Finds the notices with the specific refernt.
   * @param {User} referent The referent professor of the notice.
   * @return {Promise<Notice[]>} Promise that represents the Notice array having the passed referent.
   */
  static async findByReferent(referent) {
    if (!refernt) {
      throw new Error('No Parameters');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          const rows = notices.filter((el) => el.referent_professor === referent);

          return Promise.all(rows.map((notice) =>
            getOtherFields(notice.protocol)
                .then(({assignments, applicationSheet, evaluationCriteria, articles, comment}) => {
                  notice.assignments = assignments;
                  notice.application_sheet = applicationSheet;
                  notice.evaluation_criteria = evaluationCriteria;
                  notice.articles = articles;
                  notice.comment = comment;

                  return new Notice(notice);
                })
                .catch((err) => {
                  throw err;
                }),
          ),
          )
              .catch((err) => {
                throw err;
              });
        });
  }

  /**
   * Finds all the notices.
   * @return {Promise<Notice[]>} Promise that represents the Notice array.
   */
  static async findAll() {
    return pool.query(`SELECT * FROM ${table}`)
        .then(() => {
          const rows = notices;

          return Promise.all(rows.map((notice) =>
            getOtherFields(notice.protocol)
                .then(({assignments, applicationSheet, evaluationCriteria, articles, comment}) => {
                  notice.assignments = assignments;
                  notice.application_sheet = applicationSheet;
                  notice.evaluation_criteria = evaluationCriteria;
                  notice.articles = articles;
                  notice.comment = comment;

                  return new Notice(notice);
                })
                .catch((err) => {
                  throw err;
                }),
          ),
          )
              .catch((err) => {
                throw err;
              });
        });
  }
}

/**
 * This function retrieve other fields of a notice.
 * @param {string} noticeProtocol The protocol of the notice.
 * @return {Promise<Object>} Promise that resolves to the object with the other fields stored in.
 */
function getOtherFields(noticeProtocol) {
  const otherFields = {
    assignments: [],
    applicationSheet: '',
    evaluationCriteria: [],
    articles: [],
    comment: '',
  };

  return Promise.all([

    Assignment.findByNotice(noticeProtocol)
        .then((assignments) => assignments.forEach((a) => otherFields.assignments.push(a)))
        .catch((err) => console.log(err)),

    ApplicationSheet.findByNotice(noticeProtocol)
        .then((applicationSheet) => otherFields.applicationSheet = applicationSheet)
        .catch((err) => console.log(err)),

    EvaluationCriterion.findByNotice(noticeProtocol)
        .then((criteria) => criteria.forEach((c) => otherFields.evaluationCriteria.push(c)))
        .catch((err) => console.log(err)),

    Article.findByNotice(noticeProtocol)
        .then((articles) => articles.forEach((a) => otherFields.articles.push(a)))
        .catch((err) => console.log(err)),

    Comment.findByProtocol(noticeProtocol)
        .then((comment) => otherFields.comment = comment)
        .catch((err) => console.log(err)),

  ])
      .then(() => otherFields)
      .catch((err) => {
        throw err;
      });
}

/**
 * This function is used to decide which actions are to perform on the db and the received objects
 * @param {*[]} dbElements
 * @param {*[]} receivedElements
 * @return {Map<*>}
 */
function getActionsToPerform(dbElements, receivedElements) {
  const map = new Map();

  let field = '';

  if (dbElements[0].name) {
    field = 'name';
  } else {
    field = 'id';
  }

  if (dbElements.length > 0) {
    dbElements.forEach((el) => map.set(el[field], {action: 'REMOVE', element: el}));
  }

  receivedElements.forEach((el) => {
    if (map.has(el[field])) {
      if (JSON.stringify(map.get(el[field]).element) != JSON.stringify(el)) {
        map.set(el[field], {action: 'UPDATE', element: el});
      } else {
        map.delete(el[field]);
      }
    } else {
      map.set(el[field], {action: 'CREATE', element: el});
    }
  });

  return map;
}

/**
 * This function performs the CRUD actions.
 * @param {class} Class
 * @param {*[]} actions
 * @return {Promise[]}
 */
function performActions(Class, actions) {
  const promises = [];

  actions.forEach((value) => {
    switch (value.action) {
      case 'CREATE':
        promises.push(Class.create(value.element));
        break;
      case 'UPDATE':
        promises.push(Class.update(value.element));
        break;
      case 'REMOVE':
        promises.push(Class.remove(value.element));
        break;
    }
  });

  return promises;
}

Notice.States = States;
Notice.Types = Types;

module.exports = Notice;
