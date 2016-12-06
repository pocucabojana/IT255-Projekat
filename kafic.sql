/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     12/2/2016 10:43:23 AM                        */
/*==============================================================*/


drop table if exists KONOBARI;

drop table if exists PICE;

drop table if exists PORUDZBINA;

drop table if exists VRSTA_PICA;

/*==============================================================*/
/* Table: KONOBARI                                              */
/*==============================================================*/
create table KONOBARI
(
   KONOBARI_ID          int not null auto_increment,
   KONOBARI_IME         varchar(1024) not null,
   KONOBARI_PREZIME     varchar(1024) not null,
   KONOBARI_USERNAME    varchar(1024) not null,
   KONOBARI_PASSWORD    varchar(1024) not null,
   TOKEN                varchar(1024) not null,
   primary key (KONOBARI_ID)
);

/*==============================================================*/
/* Table: PICE                                                  */
/*==============================================================*/
create table PICE
(
   PICE_ID              int not null auto_increment,
   VRSTA_PICA_ID        int,
   PICE_IME             varchar(1024) not null,
   PICE_CENA            decimal(12,2) not null,
   PICE_OPIS            varchar(1024) not null,
   primary key (PICE_ID)
);

/*==============================================================*/
/* Table: PORUDZBINA                                            */
/*==============================================================*/
create table PORUDZBINA
(
   PORUDZBINA_ID        int not null auto_increment,
   PICE_ID              int,
   KONOBARI_ID          int,
   PORUDZBINA_DATUM     datetime,
   primary key (PORUDZBINA_ID)
);

/*==============================================================*/
/* Table: VRSTA_PICA                                            */
/*==============================================================*/
create table VRSTA_PICA
(
   VRSTA_PICA_ID        int not null auto_increment,
   VRSTA_PICA_IME       varchar(1024) not null,
   primary key (VRSTA_PICA_ID)
);

alter table PICE add constraint FK_IMA foreign key (VRSTA_PICA_ID)
      references VRSTA_PICA (VRSTA_PICA_ID) on delete restrict on update restrict;

alter table PORUDZBINA add constraint FK_JE_U foreign key (PICE_ID)
      references PICE (PICE_ID) on delete restrict on update restrict;

alter table PORUDZBINA add constraint FK_VRSI foreign key (KONOBARI_ID)
      references KONOBARI (KONOBARI_ID) on delete restrict on update restrict;

