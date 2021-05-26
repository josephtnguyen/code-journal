/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

data.entries.push(
  {
    title: 'Ada Lovelace',
    url: 'https://miro.medium.com/max/2944/1*G0or3nXOtD3vVEvyEbCldQ.png',
    notes: "Augusta Ada King, Countess of Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage's proposed mechanical general-purpose computer, the Analytical Engine. She was the first to recognize that the machine had applications beyond pure calculation, and to have published the first algorithm intended to be carried out by such a machine."
  }
);

data.entries.push(
  {
    title: 'JavaScript',
    url: 'https://venturebeat.com/wp-content/uploads/2018/01/javascript.jpg?fit=1800%2C1116&strip=all',
    notes: "JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions."
  }
);

data.nextEntryId = 3;
