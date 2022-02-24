<?php

namespace App\Entity;

use ApiPlatform\Core\Action\NotFoundAction;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\MeController;
use App\Repository\MemberRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MemberRepository::class)]
#[ApiResource(
    collectionOperations: [
        'me' => [
            'pagination_enabled' => false,
            'path' => '/me',
            'method' => 'get',
            'controller' => MeController::class,
            'read' => false,
            'openapi_context' => [
                'security' => [["bearerAuth" => []]]
            ]
        ],
        'get',
        'post'
    ],
    itemOperations: [
        'get'
    ],

    normalizationContext: ['groups' => ['read:Member']]
)]
class Member implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups('read:Member', 'read:conversations')]
    private $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Groups(['read:Member', 'read:conversations'])]
    private $pseudo;

    #[ORM\Column(type: 'json')]
    #[Groups(['read:Member'])]
    private $roles = [];

    #[ORM\Column(type: 'string')]
    private $password;

    #[ORM\OneToMany(mappedBy: 'fromMember', targetEntity: Message::class)]
    private $myMessages;

    #[ORM\OneToMany(mappedBy: 'toMember', targetEntity: Message::class)]
    private $inBox;

    #[ORM\OneToMany(mappedBy: 'creator', targetEntity: Story::class)]
    private $stories;

    #[ORM\OneToMany(mappedBy: 'creator', targetEntity: Post::class)]
    private $posts;

    #[ORM\ManyToMany(targetEntity: Conversation::class, mappedBy: 'members')]
    #[Groups(['read:Member'])]
    private $conversations;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['read:Member', 'read:conversations'])]
    private $avatar;

    public function __construct()
    {
        $this->myMessages = new ArrayCollection();
        $this->inBox = new ArrayCollection();
        $this->stories = new ArrayCollection();
        $this->posts = new ArrayCollection();
        $this->conversations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPseudo(): ?string
    {
        return $this->pseudo;
    }

    public function setPseudo(string $pseudo): self
    {
        $this->pseudo = $pseudo;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->pseudo;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection<int, Message>
     */
    public function getMyMessages(): Collection
    {
        return $this->myMessages;
    }

    public function addMyMessage(Message $myMessage): self
    {
        if (!$this->myMessages->contains($myMessage)) {
            $this->myMessages[] = $myMessage;
            $myMessage->setFromMember($this);
        }

        return $this;
    }

    public function removeMyMessage(Message $myMessage): self
    {
        if ($this->myMessages->removeElement($myMessage)) {
            // set the owning side to null (unless already changed)
            if ($myMessage->getFromMember() === $this) {
                $myMessage->setFromMember(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Message>
     */
    public function getInBox(): Collection
    {
        return $this->inBox;
    }

    public function addInBox(Message $inBox): self
    {
        if (!$this->inBox->contains($inBox)) {
            $this->inBox[] = $inBox;
            $inBox->setToMember($this);
        }

        return $this;
    }

    public function removeInBox(Message $inBox): self
    {
        if ($this->inBox->removeElement($inBox)) {
            // set the owning side to null (unless already changed)
            if ($inBox->getToMember() === $this) {
                $inBox->setToMember(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Story>
     */
    public function getStories(): Collection
    {
        return $this->stories;
    }

    public function addStory(Story $story): self
    {
        if (!$this->stories->contains($story)) {
            $this->stories[] = $story;
            $story->setCreator($this);
        }

        return $this;
    }

    public function removeStory(Story $story): self
    {
        if ($this->stories->removeElement($story)) {
            // set the owning side to null (unless already changed)
            if ($story->getCreator() === $this) {
                $story->setCreator(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Post>
     */
    public function getPosts(): Collection
    {
        return $this->posts;
    }

    public function addPost(Post $post): self
    {
        if (!$this->posts->contains($post)) {
            $this->posts[] = $post;
            $post->setCreator($this);
        }

        return $this;
    }

    public function removePost(Post $post): self
    {
        if ($this->posts->removeElement($post)) {
            // set the owning side to null (unless already changed)
            if ($post->getCreator() === $this) {
                $post->setCreator(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Conversation>
     */
    public function getConversations(): Collection
    {
        return $this->conversations;
    }

    public function addConversation(Conversation $conversation): self
    {
        if (!$this->conversations->contains($conversation)) {
            $this->conversations[] = $conversation;
            $conversation->addMember($this);
        }

        return $this;
    }

    public function removeConversation(Conversation $conversation): self
    {
        if ($this->conversations->removeElement($conversation)) {
            $conversation->removeMember($this);
        }

        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(?string $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }
}
