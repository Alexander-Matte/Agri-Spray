<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\CustomerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\ApiProperty;

#[ORM\Entity(repositoryClass: CustomerRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(validationContext: ['groups' => ['Default', 'customer:create']], security: "is_granted('ROLE_MANAGER')"),
        new Get(),
        new Put(validationContext: ['groups' => ['Default', 'customer:update']], security: "is_granted('ROLE_MANAGER')"),
        new Patch(validationContext: ['groups' => ['Default', 'customer:update']], security: "is_granted('ROLE_MANAGER')"),
        new Delete(security: "is_granted('ROLE_MANAGER')"),
    ],
    normalizationContext: ['groups' => ['customer:read']],
    denormalizationContext: ['groups' => ['customer:create', 'customer:update']],
)]
#[UniqueEntity('email', message: 'This email address is already registered for another customer.')]
class Customer
{
    #[Groups(['customer:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\NotBlank(message: 'Customer name is required.')]
    #[Assert\Length(
        min: 2,
        max: 255,
        minMessage: 'Customer name must be at least {{ limit }} characters long.',
        maxMessage: 'Customer name cannot be longer than {{ limit }} characters.'
    )]
    #[Assert\Regex(
        pattern: '/^[a-zA-Z0-9\s\-\.\,\&\'\(\)]+$/',
        message: 'Customer name can only contain letters, numbers, spaces, hyphens, dots, commas, ampersands, apostrophes, and parentheses.'
    )]
    #[ApiProperty(example: 'Smith Family Farm')]
    #[Groups(['customer:read', 'customer:create', 'customer:update'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

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
    #[ApiProperty(example: '+1234567890')]
    #[Groups(['customer:read', 'customer:create', 'customer:update'])]
    #[ORM\Column(length: 255)]
    private ?string $phoneNumber = null;

    #[Assert\Email(message: 'Please enter a valid email address.')]
    #[Assert\Length(
        max: 255,
        maxMessage: 'Email address cannot be longer than {{ limit }} characters.'
    )]
    #[Assert\Regex(
        pattern: '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
        message: 'Please enter a valid email address format.'
    )]
    #[ApiProperty(example: 'contact@smithfarm.com')]
    #[Groups(['customer:read', 'customer:create', 'customer:update'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $email = null;

    /**
     * @var Collection<int, Mission>
     */
    #[Groups(['customer:read'])]
    #[ORM\OneToMany(targetEntity: Mission::class, mappedBy: 'customer')]
    private Collection $missions;

    public function __construct()
    {
        $this->missions = new ArrayCollection();
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

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): static
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): static
    {
        $this->email = $email;

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
            $mission->setCustomer($this);
        }

        return $this;
    }

    public function removeMission(Mission $mission): static
    {
        if ($this->missions->removeElement($mission)) {
            // set the owning side to null (unless already changed)
            if ($mission->getCustomer() === $this) {
                $mission->setCustomer(null);
            }
        }

        return $this;
    }
}
