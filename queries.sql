CREATE TABLE Book_list(
	id SERIAL PRIMARY KEY,
	title TEXT,
	author TEXT,
	date DATE,
    rating INTEGER,
    review TEXT,
    notes TEXT,
	ISBN TEXT UNIQUE NOT NULL   
);

INSERT INTO Book_list(title,author,date,rating,review,notes,ISBN)
VALUES ('You Can Negotiate Anything - by Herb Cohen','Herb Cohen','2016-06-05',10,'Very good book','Must read','0818403055');

INSERT INTO Book_list(title,author,date,rating,review,notes,ISBN)
VALUES ('Bridge of waves - by W.A. Mathieu','W.A. Mathieu','2021-09-03',9,'Very nice book','Must read once','9781590307328');