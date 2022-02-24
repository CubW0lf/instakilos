<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220222125955 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE conversation (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE conversation_member (conversation_id INT NOT NULL, member_id INT NOT NULL, INDEX IDX_422840B89AC0396 (conversation_id), INDEX IDX_422840B87597D3FE (member_id), PRIMARY KEY(conversation_id, member_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE member (id INT AUTO_INCREMENT NOT NULL, pseudo VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, avatar VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_70E4FA7886CC499D (pseudo), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE message (id INT AUTO_INCREMENT NOT NULL, from_member_id INT NOT NULL, to_member_id INT NOT NULL, conversation_id INT NOT NULL, content LONGTEXT NOT NULL, INDEX IDX_B6BD307F650B4644 (from_member_id), INDEX IDX_B6BD307F4434048F (to_member_id), INDEX IDX_B6BD307F9AC0396 (conversation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE post (id INT AUTO_INCREMENT NOT NULL, creator_id INT NOT NULL, place VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, INDEX IDX_5A8A6C8D61220EA6 (creator_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE story (id INT AUTO_INCREMENT NOT NULL, creator_id INT NOT NULL, image VARCHAR(255) NOT NULL, INDEX IDX_EB56043861220EA6 (creator_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE conversation_member ADD CONSTRAINT FK_422840B89AC0396 FOREIGN KEY (conversation_id) REFERENCES conversation (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE conversation_member ADD CONSTRAINT FK_422840B87597D3FE FOREIGN KEY (member_id) REFERENCES member (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F650B4644 FOREIGN KEY (from_member_id) REFERENCES member (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F4434048F FOREIGN KEY (to_member_id) REFERENCES member (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F9AC0396 FOREIGN KEY (conversation_id) REFERENCES conversation (id)');
        $this->addSql('ALTER TABLE post ADD CONSTRAINT FK_5A8A6C8D61220EA6 FOREIGN KEY (creator_id) REFERENCES member (id)');
        $this->addSql('ALTER TABLE story ADD CONSTRAINT FK_EB56043861220EA6 FOREIGN KEY (creator_id) REFERENCES member (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE conversation_member DROP FOREIGN KEY FK_422840B89AC0396');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F9AC0396');
        $this->addSql('ALTER TABLE conversation_member DROP FOREIGN KEY FK_422840B87597D3FE');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F650B4644');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F4434048F');
        $this->addSql('ALTER TABLE post DROP FOREIGN KEY FK_5A8A6C8D61220EA6');
        $this->addSql('ALTER TABLE story DROP FOREIGN KEY FK_EB56043861220EA6');
        $this->addSql('DROP TABLE conversation');
        $this->addSql('DROP TABLE conversation_member');
        $this->addSql('DROP TABLE member');
        $this->addSql('DROP TABLE message');
        $this->addSql('DROP TABLE post');
        $this->addSql('DROP TABLE story');
    }
}
