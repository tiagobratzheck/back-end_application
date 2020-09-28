DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS sales;

CREATE TABLE applications (
	id_app INT NOT NULL auto_increment,
	desc_app VARCHAR(25) NOT NULL,
	category VARCHAR(15) NOT NULL,
	developer VARCHAR(25) NOT NULL,
    size_mb double(100, 2) NOT NULL,
    PRIMARY KEY (id_app)
);
ALTER TABLE applications auto_increment = 1;

CREATE TABLE sales (
	id_sales INT NOT NULL auto_increment,
    date_sales DATE NOT NULL,
	id_app INT NOT NULL,
    PRIMARY KEY (id_sales)
);
ALTER TABLE sales auto_increment = 1;
ALTER TABLE sales ADD CONSTRAINT id_app_fk
	FOREIGN KEY (id_app) REFERENCES applications (id_app);