const pool = require('../db');
const ApplicationSheet = require('./applicationSheet');
const EvaluationCriterion = require('./evalutationCriterion');
const Article = require('./article');
const Assignment = require('./assignment');
const Comment = require('./comment');

const table = 'notice';

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
 * Notice
 *
 * This class represents a Notice
 *
 * @author Francesco Migliaro, Marco D'Antonio
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

    return pool.query(`INSERT INTO ${table} SET ?`, notice)
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

    return pool.query(`UPDATE ${table} SET ? WHERE protocol = ?`, [notice, notice.protocol])
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

    return pool.query(`DELETE FROM ${table} WHERE protocol = ?`, notice.protocol)
        .then(([resultSetHeader]) => {
          return resultSetHeader.affectedRows > 0;
        })
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

    return pool.query(`SELECT * FROM ${table} WHERE protocol = ?`, notice.protocol)
        .then(([rows]) => {
          return rows.length > 0;
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

    return pool.query(`SELECT * FROM ${table} WHERE protocol LIKE ?`, '%' + noticeProtocol + '%')
        .then(([rows]) => {
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

    return pool.query(query, states)
        .then(([rows]) => {
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
    if (!referent) {
      throw new Error('No Parameters');
    }

    return pool.query(`SELECT * FROM ${table} WHERE referent_professor = ?`, referent)
        .then(([rows]) => {
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
        .then(([rows]) => {
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
