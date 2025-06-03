DROP TABLE IF EXISTS Alerts;
DROP TABLE IF EXISTS Streamers;
DROP TABLE IF EXISTS Guilds;

CREATE TABLE Guilds(
    idGuild TEXT NOT NULL,
    idChannel TEXT,
    CONSTRAINT pk_guilds_idguild PRIMARY KEY (idGuild)
);

CREATE TABLE Users(
    idUser TEXT NOT NULL,
    CONSTRAINT pk_users_idusers PRIMARY KEY (idUser)
);

CREATE TABLE Alerts(
    idUser TEXT NOT NULL,
    idGuild TEXT NOT NULL,
    CONSTRAINT pk_alerts_iduser_guild PRIMARY KEY (idUser, idGuild),
    CONSTRAINT fk_alerts_iduser FOREIGN KEY (idUser) REFERENCES Users(idUser),
    CONSTRAINT fk_alerts_idguild FOREIGN KEY (idGuild) REFERENCES Guilds(idGuild)
);