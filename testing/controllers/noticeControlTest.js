// Import dotenv
const dotenv = require('dotenv');

// Configure dotenv
dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const {expect} = chai;
const proxy = require('proxyquire').noCallThru();

const NoticeStub = require('./stub/noticeStub');
const UserStub = require('./stub/userStub');
const path = {
  '../models/notice': NoticeStub,
  '../models/user': UserStub,
};

const noticeControl = proxy('../../controllers/noticeControl', path);
const {mockRequest, mockResponse} = require('mock-req-res');
let req;
let res;

describe('Controller Bando', function() {
  let notice;

  describe('Test_CreaBozzaBando', function() {
    beforeEach(function() {
      notice = {
        protocol: 'Prot. n. 0269008',
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
        assignments: [{
          id: 100,
          notice_protocol: 'Prot. n. 0269008',
          student: null,
          code: 'BD/01',
          activity_description: 'Base Dati',
          total_number_hours: 35,
          title: 'Master',
          hourly_cost: 35,
          ht_fund: null,
          state: 'Unassigned',
          note: null,
        }],
        comment: null,
        application_sheet: null,
        evaluation_criteria: [{
          notice_protocol: 'Prot. n. 0269008',
          name: 'Esperienze didattiche maturate nelle Università',
          max_score: 17,
        }],
        articles: [{
          id: 100,
          notice_protocol: 'Prot. n. 0269008',
          text: 'Articolo 1',
          initial: 'VISTO',
        }],
      };
      req = mockRequest({method: 'PUT', body: {notice: notice}});
      res = mockResponse();
    });

    it('TCS_AV.1.0', function() {
      notice.protocol = '';
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.1', function() {
      notice.protocol = notice.protocol.repeat(126);
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.2', function() {
      notice.protocol = 'Prov. n. A';
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.3', async function() {
      notice.protocol = 'Prot. n. 0279008';
      await noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.4', function() {
      notice.description = 'a'.repeat(301);
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.5', function() {
      notice.notice_subject = 'a'.repeat(2001);
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.6', function() {
      notice.assignments[0].code = '';
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.7', function() {
      notice.assignments[0].code = notice.assignments[0].code.repeat(31);
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.8', function() {
      notice.assignments[0].code = 'Prova123';
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    // Il controllo dei codici degli incarichi è eseguito lato front Vedere se TODO
    it('TCS_AV.1.9', function() {
      expect(true);
    });

    it('TCS_AV.1.10', function() {
      notice.assignments[0].activity_description = '';
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });


    it('TCS_AV.1.11', function() {
      notice.assignments[0].activity_description = 'a'.repeat(201);
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.12', function() {
      notice.assignments[0].total_number_hours = 0;
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.13', function() {
      notice.assignments[0].total_number_hours = 60;
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.14', function() {
      notice.assignments[0].total_number_hours = 'Ciao';
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.15', function() {
      notice.assignments[0].title = '';
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.16', function() {
      notice.assignments[0].hourly_cost = 0.0;
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.17', function() {
      notice.assignments[0].hourly_cost = 250.00;
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.18', function() {
      notice.assignments[0].hourly_cost = 'Ciao';
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.19', function() {
      notice.assignments[0].ht_fund = 'a'.repeat(101);
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.20', function() {
      notice.assignments = [];
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.21', function() {
      for (i = 0; i < 16; i ++) {
        notice.assignments.push(notice.assignments[0]);
      }
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.22', function() {
      notice.admission_requirements = 'a'.repeat(5091);
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.23', function() {
      notice.evaluation_criteria[0].name = '';
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.24', function() {
      notice.evaluation_criteria[0].name = 'a'.repeat(128);
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    // Il nome del criterio inserito viene controllato lato front Vedere se TODO
    it('TCS_AV.1.25', function() {
      expect(true);
    });

    it('TCS_AV.1.26', function() {
      notice.evaluation_criteria[0].max_score = 0;
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.27', function() {
      notice.evaluation_criteria[0].max_score = 100;
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.28', function() {
      notice.evaluation_criteria[0].max_score = 'Ciao';
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.29', function() {
      notice.evaluation_criteria = [];
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.30', function() {
      for (i = 0; i < 10; i ++) {
        notice.evaluation_criteria.push(notice.evaluation_criteria[0]);
      }
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.31', function() {
      notice.assessable_titles = 'a'.repeat(5091);
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.32', function() {
      notice.how_to_submit_applications = 'a'.repeat(5091);
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.33', function() {
      notice.selection_board = 'a'.repeat(5091);
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.34', function() {
      notice.acceptance = 'a'.repeat(5091);
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.35', function() {
      notice.incompatibility = 'a'.repeat(5091);
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.36', function() {
      notice.termination_of_the_assignment = 'a'.repeat(5091);
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.37', function() {
      notice.nature_of_the_assignment = 'a'.repeat(5091);
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.38', function() {
      notice.unused_funds = 'a'.repeat(5091);
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.39', function() {
      notice.responsible_for_the_procedure = 'a'.repeat(5091);
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.40', function() {
      notice.notice_funds = 0.00;
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.41', function() {
      notice.notice_funds = '650.00 ab';
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.42', function() {
      notice.type = 'a'.repeat(51);
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.43', function() {
      notice.deadline = '';
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.44', function() {
      notice.articles[0].initial = '';
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.45', function() {
      notice.articles[0].initial = 'a'.repeat(26);
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.46', function() {
      notice.articles[0].initial = '1234';
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.47', function() {
      notice.articles[0].text = '';
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.48', function() {
      notice.articles[0].text = 'a'.repeat(5091);
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.49', function() {
      notice.articles = [];
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.50', function() {
      for (i = 0; i < 30; i ++) {
        notice.articles.push(notice.articles[0]);
      }
      noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.1.51', function() {
      noticeControl.create(req, res)
          .then(() => {
            expect(res.status).to.have.been.calledWith(200);
          })
          .catch((err) => console.log(err));
    });
  });

  describe('Test_ModificaBozzaBando', function() {
    beforeEach(function() {
      notice = {
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
        assignments: [{
          id: 101,
          notice_protocol: 'Prot. n. 0269008',
          student: null,
          code: 'BD/01',
          activity_description: 'Base Dati',
          total_number_hours: 35,
          title: 'Master',
          hourly_cost: 35,
          ht_fund: null,
          state: 'Unassigned',
          note: null,
        }],
        comment: null,
        application_sheet: null,
        evaluation_criteria: [{
          notice_protocol: 'Prot. n. 0269008',
          name: 'Esperienze didattiche maturate nelle Università',
          max_score: 17,
        }],
        articles: [{
          id: 101,
          notice_protocol: 'Prot. n. 0269008',
          text: 'Articolo 1',
          initial: 'VISTO',
        }],
      };
      req = mockRequest({method: 'PUT', body: {notice: notice}});
      res = mockResponse();
    });

    it('TCS_AV.2.0', function() {
      notice.protocol = '';
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.1', function() {
      notice.protocol = notice.protocol.repeat(126);
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.2', function() {
      notice.protocol = 'Prov. n. A';
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.3', async function() {
      notice.protocol = 'Prot. n. 029008';
      await noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.4', function() {
      notice.description = 'a'.repeat(301);
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.5', function() {
      notice.notice_subject = 'a'.repeat(2001);
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.6', function() {
      notice.assignments[0].code = '';
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.7', function() {
      notice.assignments[0].code = notice.assignments[0].code.repeat(31);
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.8', function() {
      notice.assignments[0].code = 'Prova123';
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    // Il controllo dei codici degli incarichi è eseguito lato front Vedere se TODO
    it('TCS_AV.2.9', function() {
      expect(true);
    });

    it('TCS_AV.2.10', function() {
      notice.assignments[0].activity_description = '';
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.11', function() {
      notice.assignments[0].activity_description = 'a'.repeat(201);
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.12', function() {
      notice.assignments[0].total_number_hours = 0;
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.13', function() {
      notice.assignments[0].total_number_hours = 60;
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.14', function() {
      notice.assignments[0].total_number_hours = 'Ciao';
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.15', function() {
      notice.assignments[0].title = '';
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.16', function() {
      notice.assignments[0].hourly_cost = 0.0;
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.17', function() {
      notice.assignments[0].hourly_cost = 250.00;
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.18', function() {
      notice.assignments[0].hourly_cost = 'Ciao';
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.19', function() {
      notice.assignments[0].ht_fund = 'a'.repeat(101);
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.20', function() {
      notice.assignments = [];
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.21', function() {
      for (i = 0; i < 16; i ++) {
        notice.assignments.push(notice.assignments[0]);
      }
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.22', function() {
      notice.admission_requirements = 'a'.repeat(5091);
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.23', function() {
      notice.evaluation_criteria[0].name = '';
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.24', function() {
      notice.evaluation_criteria[0].name = 'a'.repeat(128);
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    // Il nome del criterio inserito viene controllato lato front Vedere se TODO
    it('TCS_AV.2.25', function() {
      expect(true);
    });

    it('TCS_AV.2.26', function() {
      notice.evaluation_criteria[0].max_score = 0;
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.27', function() {
      notice.evaluation_criteria[0].max_score = 100;
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.28', function() {
      notice.evaluation_criteria[0].max_score = 'Ciao';
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.29', function() {
      notice.evaluation_criteria = [];
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.30', function() {
      for (i = 0; i < 10; i ++) {
        notice.evaluation_criteria.push(notice.evaluation_criteria[0]);
      }
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.31', function() {
      notice.assessable_titles = 'a'.repeat(5091);
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.32', function() {
      notice.how_to_submit_applications = 'a'.repeat(5091);
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.33', function() {
      notice.selection_board = 'a'.repeat(5091);
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.34', function() {
      notice.acceptance = 'a'.repeat(5091);
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.35', function() {
      notice.incompatibility = 'a'.repeat(5091);
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.36', function() {
      notice.termination_of_the_assignment = 'a'.repeat(5091);
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.37', function() {
      notice.nature_of_the_assignment = 'a'.repeat(5091);
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.38', function() {
      notice.unused_funds = 'a'.repeat(5091);
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.39', function() {
      notice.responsible_for_the_procedure = 'a'.repeat(5091);
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.40', function() {
      notice.notice_funds = 0.00;
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.41', function() {
      notice.notice_funds = '650.00 ab';
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.42', function() {
      notice.type = 'a'.repeat(51);
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.43', function() {
      notice.deadline = '';
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.44', function() {
      notice.articles[0].initial = '';
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.45', function() {
      notice.articles[0].initial = 'a'.repeat(26);
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.46', function() {
      notice.articles[0].initial = '1234';
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.47', function() {
      notice.articles[0].text = '';
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.48', function() {
      notice.articles[0].text = 'a'.repeat(5091);
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.49', function() {
      notice.articles = [];
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.50', function() {
      for (i = 0; i < 30; i ++) {
        notice.articles.push(notice.articles[0]);
      }
      noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV.2.51', function() {
      noticeControl.update(req, res)
          .then(() => {
            expect(res.status).to.have.been.calledWith(200);
          })
          .catch((err) => console.log(err));
    });
  });
});
