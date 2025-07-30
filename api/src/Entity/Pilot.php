<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\PilotRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: PilotRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(validationContext: ['groups' => ['Default', 'pilot:create']], security: "is_granted('ROLE_MANAGER')"),
        new Get(),
        new Put(validationContext: ['groups' => ['Default', 'pilot:update']], security: "is_granted('ROLE_MANAGER')"),
        new Patch(validationContext: ['groups' => ['Default', 'pilot:update']], security: "is_granted('ROLE_MANAGER')"),
        new Delete(security: "is_granted('ROLE_MANAGER')"),
    ],
    normalizationContext: ['groups' => ['pilot:read']],
    denormalizationContext: ['groups' => ['pilot:create', 'pilot:update']],
)]
#[UniqueEntity('email', message: 'This email address is already registered for another pilot.')]
class Pilot
{
    #[Groups(['pilot:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\NotBlank(message: 'Pilot name is required.')]
    #[Assert\Length(
        min: 2,
        max: 255,
        minMessage: 'Pilot name must be at least {{ limit }} characters long.',
        maxMessage: 'Pilot name cannot be longer than {{ limit }} characters.'
    )]
    #[Assert\Regex(
        pattern: '/^[a-zA-Z\s\-\.\']+$/',
        message: 'Pilot name can only contain letters, spaces, hyphens, dots, and apostrophes.'
    )]
    #[Groups(['pilot:read', 'pilot:create', 'pilot:update'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Assert\NotBlank(message: 'Email address is required.')]
    #[Assert\Email(message: 'Please enter a valid email address.')]
    #[Assert\Length(
        max: 255,
        maxMessage: 'Email address cannot be longer than {{ limit }} characters.'
    )]
    #[Assert\Regex(
        pattern: '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
        message: 'Please enter a valid email address format.'
    )]
    #[Groups(['pilot:read', 'pilot:create', 'pilot:update'])]
    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[Groups(['pilot:read'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[Groups(['pilot:read'])]
    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[Assert\NotBlank(message: 'Phone number is required.')]
    #[Assert\Length(
        min: 10,
        max: 20,
        minMessage: 'Phone number must be at least {{ limit }} characters long.',
        maxMessage: 'Phone number cannot be longer than {{ limit }} characters.'
    )]
    #[Assert\Regex(
        pattern: '/^[\+]?[1-9][\d]{0,15}$/',
        message: 'Please enter a valid phone number. Only digits, plus sign at the beginning, and no spaces are allowed.'
    )]
    #[Groups(['pilot:read', 'pilot:create', 'pilot:update'])]
    #[ORM\Column(length: 255)]
    private ?string $phoneNumber = null;

    /**
     * @var Collection<int, Mission>
     */
    #[Groups(['pilot:read'])]
    #[ORM\OneToMany(targetEntity: Mission::class, mappedBy: 'pilot')]
    private Collection $missions;

    public function __construct()
    {
        $this->missions = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): static
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    /**
     * @return Collection<int, Mission>
     */
    public function getMissions(): Collection
    {
        return $this->missions;
    }

    public function addMission(Mission $mission): static
    {
        if (!$this->missions->contains($mission)) {
            $this->missions->add($mission);
            $mission->setPilot($this);
        }

        return $this;
    }

    public function removeMission(Mission $mission): static
    {
        if ($this->missions->removeElement($mission)) {
            // set the owning side to null (unless already changed)
            if ($mission->getPilot() === $this) {
                $mission->setPilot(null);
            }
        }

        return $this;
    }
}
