<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use App\Repository\MessageRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
#[ApiResource(normalizationContext: ['groups' => ['read:Messages']])]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:Messages', 'read:conversations'])]
    private $id;

    #[ORM\ManyToOne(targetEntity: Member::class, inversedBy: 'myMessages')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:Messages', 'read:conversations'])]
    private $fromMember;

    #[ORM\ManyToOne(targetEntity: Member::class, inversedBy: 'inBox')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:Messages', 'read:conversations'])]
    private $toMember;

    #[ORM\ManyToOne(targetEntity: Conversation::class, inversedBy: 'messages')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:Messages'])]
    private $conversation;

    #[ORM\Column(type: 'text')]
    #[Groups(['read:Messages', 'read:conversations'])]
    private $content;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFromMember(): ?Member
    {
        return $this->fromMember;
    }

    public function setFromMember(?Member $fromMember): self
    {
        $this->fromMember = $fromMember;

        return $this;
    }

    public function getToMember(): ?Member
    {
        return $this->toMember;
    }

    public function setToMember(?Member $toMember): self
    {
        $this->toMember = $toMember;

        return $this;
    }

    public function getConversation(): ?Conversation
    {
        return $this->conversation;
    }

    public function setConversation(?Conversation $conversation): self
    {
        $this->conversation = $conversation;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }
}
