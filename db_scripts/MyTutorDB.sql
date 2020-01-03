/* Creazione del database  */
DROP DATABASE IF EXISTS mytutor;
CREATE DATABASE mytutor;
USE mytutor;

DROP USER IF EXISTS 'mt_admin'@'localhost';
CREATE USER 'mt_admin'@'localhost' IDENTIFIED BY 'mt_password';
GRANT ALL PRIVILEGES ON mytutor.* TO 'mt_admin'@'localhost';

DROP TABLE IF EXISTS user;

CREATE TABLE user (
  email      varchar(125) NOT NULL, 
  password   varchar(255) NOT NULL, 
  name       varchar(40) NOT NULL, 
  surname    varchar(50) NOT NULL, 
  role       Enum('Student', 'Professor', 'DDI', 'Teaching Office') NOT NULL default 'Student', 
  verified    tinyint(1) NOT NULL, 
  PRIMARY KEY (email));

DROP TABLE IF EXISTS student; 
 
  CREATE TABLE student (
  user_email                varchar(125) NOT NULL, 
  registration_number       varchar(10) NOT NULL, 
  birth_date                timestamp NOT NULL, 
  PRIMARY KEY (user_email),
  FOREIGN KEY (user_email) REFERENCES user(email) ON UPDATE Cascade ON DELETE Cascade );

DROP TABLE IF EXISTS notice;

CREATE TABLE notice (
  protocol                                varchar(125) NOT NULL, 
  referent_professor                      varchar(125), 
  description                             text, 
  notice_subject                          text, 
  admission_requirements                  text, 
  assessable_titles                       text, 
  how_to_submit_applications              text, 
  selection_board                         text, 
  acceptance                              text, 
  incompatibility                         text, 
  termination_of_the_assignment           text, 
  nature_of_the_assignment                text, 
  unused_funds                            text, 
  responsible_for_the_procedure           text, 
  notice_funds                            float, 
  state                                   Enum('Draft', 'In Acceptance', 'Accepted', 'In Approval', 'Approved', 'Published', 'Expired', 'Waiting for Graded List', 'Closed') NOT NULL default 'Draft', 
  type                                    Enum('Help Teaching', 'Tutoring'), 
  deadline                                timestamp, 
  notice_file                             varchar(255), 
  graded_list_file                        varchar(255), 
  PRIMARY KEY (protocol),
  FOREIGN KEY (referent_professor) REFERENCES user(email) ON UPDATE Cascade ON DELETE Set null);

DROP TABLE IF EXISTS verified_email;

CREATE TABLE verified_email (
  email             varchar(125) NOT NULL, 
  signed_up         int(1) NOT NULL, 
  PRIMARY KEY (email));


DROP TABLE IF EXISTS article;

CREATE TABLE article (
  id                  int(11) NOT NULL AUTO_INCREMENT, 
  notice_protocol     varchar(125) NOT NULL, 
  text                text NOT NULL, 
  initial             varchar(20) NOT NULL, 
  PRIMARY KEY (id),
  FOREIGN KEY (notice_protocol) REFERENCES notice(protocol) ON UPDATE Cascade ON DELETE Cascade );

DROP TABLE IF EXISTS assignment;

CREATE TABLE assignment (
  id                      int(11) NOT NULL AUTO_INCREMENT, 
  notice_protocol         varchar(125) NOT NULL, 
  student                 varchar(125), 
  code                    varchar(30) NOT NULL, 
  activity_description    text NOT NULL, 
  total_number_hours      int(3) NOT NULL, 
  title                   Enum('PhD','Master') NOT NULL, 
  hourly_cost             float NOT NULL, 
  ht_fund                 tinytext, 
  state                   Enum('Unassigned', 'Waiting', 'Booked', 'Assigned', 'Over') NOT NULL default 'Unassigned', 
  note					  varchar(255),
  PRIMARY KEY (id),
  FOREIGN KEY (notice_protocol) REFERENCES notice(protocol) ON UPDATE Cascade ON DELETE Cascade,
  FOREIGN KEY (student) REFERENCES student(user_email) ON UPDATE Cascade ON DELETE Set null );
  
DROP TABLE IF EXISTS rating;

CREATE TABLE rating (
  student               varchar(125) NOT NULL, 
  assignment_id         int(11) NOT NULL, 
  titles_score          int(3) NOT NULL, 
  interview_score       int(3) NOT NULL, 
  PRIMARY KEY (student, assignment_id),
  FOREIGN KEY (assignment_id) REFERENCES assignment(id) ON UPDATE Cascade ON DELETE Cascade,
  FOREIGN KEY (student) REFERENCES student(user_email) ON UPDATE Cascade ON DELETE Cascade );
  
DROP TABLE IF EXISTS candidature;

CREATE TABLE candidature (
  student              varchar(125) NOT NULL, 
  notice_protocol      varchar(125) NOT NULL, 
  state                Enum('Editable', 'In Evaluation', 'Rejected', 'In Graded List') NOT NULL default 'Editable', 
  last_edit            timestamp NOT NULL, 
  PRIMARY KEY (student, notice_protocol),
  FOREIGN KEY (notice_protocol) REFERENCES notice(protocol) ON UPDATE Cascade ON DELETE Cascade,
  FOREIGN KEY (student) REFERENCES student(user_email) ON UPDATE Cascade ON DELETE Cascade );
  
DROP TABLE IF EXISTS document;
  
CREATE TABLE document (
  student                       varchar(125) NOT NULL, 
  notice_protocol               varchar(125) NOT NULL, 
  file_name                     varchar(50) NOT NULL, 
  file                          mediumblob NOT NULL, 
  PRIMARY KEY (student, notice_protocol, file_name),
  FOREIGN KEY (student, notice_protocol) REFERENCES candidature(student, notice_protocol) ON UPDATE Cascade ON DELETE Cascade );
  
DROP TABLE IF EXISTS evaluation_criterion;
  
CREATE TABLE evaluation_criterion (
  notice_protocol          varchar(125) NOT NULL, 
  name                     varchar(125) NOT NULL, 
  max_score                int(4) NOT NULL, 
  PRIMARY KEY (notice_protocol, name),
  FOREIGN KEY (notice_protocol) REFERENCES notice(protocol) ON UPDATE Cascade ON DELETE Cascade );
  
DROP TABLE IF EXISTS comment;
  
CREATE TABLE comment (
  notice                    varchar(125) NOT NULL, 
  author                    varchar(125) NOT NULL, 
  text                      tinytext NOT NULL, 
  PRIMARY KEY (notice),
  FOREIGN KEY (author) REFERENCES user(email) ON UPDATE Cascade ON DELETE Cascade,
  FOREIGN KEY (notice) REFERENCES notice(protocol) ON UPDATE Cascade ON DELETE Cascade );

DROP TABLE IF EXISTS application_sheet;

CREATE TABLE application_sheet (
  notice_protocol                   varchar(125) NOT NULL, 
  documents_to_attach               text, 
  PRIMARY KEY (notice_protocol),
  FOREIGN KEY (notice_protocol) REFERENCES notice(protocol) ON UPDATE Cascade ON DELETE Cascade );

DROP EVENT IF EXISTS checkNoticeDeadline;

DELIMITER //
CREATE EVENT checkNoticeDeadline
   ON schedule every 24 HOUR
   DO 
	BEGIN
    
		update notice set state = 'Expired' WHERE deadline < now() ; 
        update candidature, notice set candidature.state = 'In Evaluation' WHERE notice.protocol = candidature.notice_protocol AND notice.state = 'Expired';
	
    END;