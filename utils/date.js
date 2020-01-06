/**
 *  DbTimestamp
 *
 *  This class is used to adjust output timestamp from the db
 *
 *  @author Marco D'Antonio
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */
class DbTimestamp {
  /**
   * Returns a new DbTimestamp
   * @param {String} date
   * @return {String} dbTimestamp
   */
  constructor(date) {
    return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
  }
}

module.exports = DbTimestamp;

