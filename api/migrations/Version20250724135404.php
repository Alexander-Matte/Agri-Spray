<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250724135404 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE aircraft (id SERIAL NOT NULL, registration_number VARCHAR(255) NOT NULL, model VARCHAR(255) NOT NULL, hopper_capacity_gal INT NOT NULL, hopper_capacity_lt INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE base (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, location VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE chemical (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, application_rate DOUBLE PRECISION NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE customer (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, phone_number VARCHAR(255) NOT NULL, email VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE load (id SERIAL NOT NULL, loader_id INT NOT NULL, chemical_id INT NOT NULL, mission_id INT NOT NULL, load_number INT NOT NULL, chemical_amount DOUBLE PRECISION NOT NULL, water_amount DOUBLE PRECISION NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_2506E41DE2D5521C ON load (loader_id)');
        $this->addSql('CREATE INDEX IDX_2506E41DE1770A76 ON load (chemical_id)');
        $this->addSql('CREATE INDEX IDX_2506E41DBE6CAE90 ON load (mission_id)');
        $this->addSql('CREATE TABLE loader (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, phone_number VARCHAR(255) NOT NULL, email VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE mission (id SERIAL NOT NULL, pilot_id INT NOT NULL, customer_id INT NOT NULL, base_id INT NOT NULL, title VARCHAR(255) DEFAULT NULL, type VARCHAR(255) DEFAULT NULL, field_size_total DOUBLE PRECISION NOT NULL, field_size_sprayable DOUBLE PRECISION NOT NULL, location VARCHAR(255) DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, scheduled_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_9067F23CCE55439B ON mission (pilot_id)');
        $this->addSql('CREATE INDEX IDX_9067F23C9395C3F3 ON mission (customer_id)');
        $this->addSql('CREATE INDEX IDX_9067F23C6967DF41 ON mission (base_id)');
        $this->addSql('COMMENT ON COLUMN mission.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN mission.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN mission.scheduled_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE mission_aircraft (mission_id INT NOT NULL, aircraft_id INT NOT NULL, PRIMARY KEY(mission_id, aircraft_id))');
        $this->addSql('CREATE INDEX IDX_1B256690BE6CAE90 ON mission_aircraft (mission_id)');
        $this->addSql('CREATE INDEX IDX_1B256690846E2F5C ON mission_aircraft (aircraft_id)');
        $this->addSql('ALTER TABLE load ADD CONSTRAINT FK_2506E41DE2D5521C FOREIGN KEY (loader_id) REFERENCES loader (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE load ADD CONSTRAINT FK_2506E41DE1770A76 FOREIGN KEY (chemical_id) REFERENCES chemical (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE load ADD CONSTRAINT FK_2506E41DBE6CAE90 FOREIGN KEY (mission_id) REFERENCES mission (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE mission ADD CONSTRAINT FK_9067F23CCE55439B FOREIGN KEY (pilot_id) REFERENCES pilot (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE mission ADD CONSTRAINT FK_9067F23C9395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE mission ADD CONSTRAINT FK_9067F23C6967DF41 FOREIGN KEY (base_id) REFERENCES base (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE mission_aircraft ADD CONSTRAINT FK_1B256690BE6CAE90 FOREIGN KEY (mission_id) REFERENCES mission (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE mission_aircraft ADD CONSTRAINT FK_1B256690846E2F5C FOREIGN KEY (aircraft_id) REFERENCES aircraft (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE load DROP CONSTRAINT FK_2506E41DE2D5521C');
        $this->addSql('ALTER TABLE load DROP CONSTRAINT FK_2506E41DE1770A76');
        $this->addSql('ALTER TABLE load DROP CONSTRAINT FK_2506E41DBE6CAE90');
        $this->addSql('ALTER TABLE mission DROP CONSTRAINT FK_9067F23CCE55439B');
        $this->addSql('ALTER TABLE mission DROP CONSTRAINT FK_9067F23C9395C3F3');
        $this->addSql('ALTER TABLE mission DROP CONSTRAINT FK_9067F23C6967DF41');
        $this->addSql('ALTER TABLE mission_aircraft DROP CONSTRAINT FK_1B256690BE6CAE90');
        $this->addSql('ALTER TABLE mission_aircraft DROP CONSTRAINT FK_1B256690846E2F5C');
        $this->addSql('DROP TABLE aircraft');
        $this->addSql('DROP TABLE base');
        $this->addSql('DROP TABLE chemical');
        $this->addSql('DROP TABLE customer');
        $this->addSql('DROP TABLE load');
        $this->addSql('DROP TABLE loader');
        $this->addSql('DROP TABLE mission');
        $this->addSql('DROP TABLE mission_aircraft');
    }
}
