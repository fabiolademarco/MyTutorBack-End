const states = {
  UNASSIGNED: 'Unassigned',
  WAITING: 'Waiting',
  BOOKED: 'Booked',
  ASSIGNED: 'Assigned',
  OVER: 'Over',
};
const titles = {
  PHD: 'PhD',
  MASTER: 'Master',
};
const assignmentStub = [
  {
    id: 1,
    notice_protocol: 'Prot. n. 0279008',
    student: null,
    code: 'PD/01',
    activity_description: 'Programmazione distribuita',
    total_number_hours: 16,
    title: titles.PHD,
    hourly_cost: 25,
    ht_fund: null,
    state: states.UNASSIGNED,
    note: null,
  },
  {
    id: 2,
    notice_protocol: 'Prot. n. 0279008',
    student: null,
    code: 'PD/02',
    activity_description: 'Programmazione distribuita',
    total_number_hours: 16,
    title: titles.PHD,
    hourly_cost: 25,
    ht_fund: null,
    state: states.UNASSIGNED,
    note: null,
  },
  {
    id: 3,
    notice_protocol: 'Prot. n. 0279008',
    student: null,
    code: 'BD/01',
    activity_description: 'Base Dati',
    total_number_hours: 35,
    title: titles.MASTER,
    hourly_cost: 35,
    ht_fund: null,
    state: states.UNASSIGNED,
    note: null,
  },
  {
    id: 4,
    notice_protocol: 'Prot. n. 0279008',
    student: 'p.franco69@studenti.unisa.it',
    code: 'BD/01',
    activity_description: 'Base Dati',
    total_number_hours: 35,
    title: titles.MASTER,
    hourly_cost: 35,
    ht_fund: null,
    state: states.ASSIGNED,
    note: null,
  },

];

/**
 * Assignment
 *
 * This class represents an Assignment
 *
 * @author Francesco Migliaro
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */
class Assignment {
  /**
 * Assignment object constructor
 * @param {Assignment} assignment The JS object that contains field for setting new Assignment object
 */
  constructor(assignment) {
    this.id = assignment.id;
    this.notice_protocol = assignment.notice_protocol;
    this.student = assignment.student == undefined ? null : assignment.student;
    this.code = assignment.code;
    this.activity_description = assignment.activity_description;
    this.total_number_hours = Number.isInteger(assignment.total_number_hours) ?
      assignment.total_number_hours : null;
    this.title = Object.values(titles).includes(assignment.title) ?
      assignment.title : null;
    this.hourly_cost = Number.isInteger(assignment.hourly_cost) ?
      assignment.hourly_cost : assignment.hourly_cost;
    this.ht_fund = assignment.ht_fund;
    this.state = Object.values(states).includes(assignment.state) ?
      assignment.state : null;
    this.note = assignment.note;
  }
  /**
   * Creates a new Assignment.
   * @param {Assignment} assignment The assignment to save.
   * @return {Promise<Assignment>} Promise object that represents the created Assignment.
   */
  static create(assignment) {
    if (assignment == null) {
      throw new Error('No Parameters');
    }

    assignmentStub.push(assignment);

    return new Promise((resolve) => resolve())
        .then(() => assignment)
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Updates an Assignment.
   * @param {Assignment} assignment The assignment to update.
   * @return {Promise<Assignment>} Promise object that represents the updated Assignment.
   */
  static async update(assignment) {
    if (assignment == null) {
      throw new Error('No Parameters');
    }
    const exist = await this.exists(assignment);

    if (!exist) {
      throw new Error('The assignment doesn\'t exists');
    }

    assignmentStub[assignmentStub.indexOf(assignmentStub.filter((el) => el.id === assignment.id)[0])] = assignment;

    return new Promise((resolve) => resolve())
        .then(() => assignment)
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Removes an Assignment.
   * @param {Assignment} assignment The assignment to remove.
   * @return {Promise<boolean>} Promise that is true if the removal went right else it's false.
   */
  static remove(assignment) {
    if (assignment == null) {
      throw new Error('No Parameters');
    }

    return new Promise((resolve) => resolve())
        .then(() => true)
        .catch((err) => {
          throw err;
        });
  }
  /**
   * Finds the assignment with the specified id.
   * @param {Number} id The id of an existing assignment.
   * @return {Promise<Assignment>} Promise object that represents the assignment having the passed id.
   */
  static findById(id) {
    if (id == null) {
      throw new Error('No Parameters');
    }

    const assignment = assignmentStub.filter((ass) => ass.id == id)[0];

    return new Promise((resolve) => resolve())
        .then(() => assignment)
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Finds the assignments of the specified notice.
   * @param {string} noticeProtocol The protocol of a notice.
   * @return {Promise<Assignment[]>} Promise that represents the Assignments related to the passed Notice protocol.
   */
  static findByNotice(noticeProtocol) {
    if (noticeProtocol == null) {
      throw new Error('No Parameters');
    }

    const assignment = assignmentStub.filter((ass) => ass.notice_protocol == noticeProtocol);

    return new Promise((resolve) => resolve())
        .then(() => assignment)
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Finds the assignments of a student.
   * @param {string} emailStudent The email of the student.
   * @return {Promise<Assignment[]>} Promise that represents the Assignments related to the passed email Student.
   */
  static findByStudent(emailStudent) {
    if (emailStudent == null) {
      throw new Error('No Parameters');
    }

    const assignments = assignmentStub.filter((ass) => ass.student == emailStudent);

    return new Promise((resolve) => resolve())
        .then(() => assignments)
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Finds all the assignments.
   * @return {Promise<Assignment[]>} Promise that represents the list of all Assignments.
   */
  static findAll() {
    return new Promise((resolve) => resolve())
        .then(() => assignmentStub)
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Checks if an assignment exists.
   * @param {Assignment} assignment The assignment to check.
   * @return {Promise<boolean>} Promise that is true if the assignment is in the db, else it's false.
   */
  static exists(assignment) {
    if (assignment == null) {
      throw new Error('No parameters');
    }

    const assignmentResult = assignmentStub.reduce((exists, currentAssign) => {
      return exists || (currentAssign.id === assignment.id);
    }, false);

    return new Promise((resolve) => resolve())
        .then(() => assignmentResult)
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Search Filter definition
   * @typedef {Object} filter
   * @property {string} code
   * @property {string} noticeProtocol
   * @property {string} state
   * @property {string} student
   */
  /**
   * Searches a list of assignments
   * @param {filter} filter An object specifying the search criteria.
   * @return {Promise<Assignment[]>} Promise that represents the list of Assignments which respects the search criteria.
   */
  static search(filter) {
    const resultAssignments = [];

    if (filter.code) {
      resultAssignments.concat(assignmentStub.filter((ass) => ass.code == filter.code));
    }
    if (filter.noticeProtocol) {
      resultAssignments.concat(assignmentStub.filter((ass) => ass.notice_protocol == filter.noticeProtocol));
    }
    if (filter.state) {
      resultAssignments.concat(assignmentStub.filter((ass) => ass.state == filter.state));
    }
    if (filter.student) {
      resultAssignments.concat(assignmentStub.filter((ass) => ass.student == filter.student));
    }

    return new Promise((resolve) => resolve())
        .then(() => resultAssignments)
        .catch((err) => {
          throw err;
        });
  }
}

Assignment.titles = titles;
Assignment.states = states;

module.exports = Assignment;
