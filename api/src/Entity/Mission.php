<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\MissionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\ApiProperty;

#[ORM\Entity(repositoryClass: MissionRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(validationContext: ['groups' => ['Default', 'mission:create']], security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_PILOT')"),
        new Get(),
        new Put(validationContext: ['groups' => ['Default', 'mission:update']], security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_PILOT')"),
        new Patch(validationContext: ['groups' => ['Default', 'mission:update']], security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_PILOT')"),
        new Delete(security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_PILOT')"),
    ],
    normalizationContext: ['groups' => ['mission:read']],
    denormalizationContext: ['groups' => ['mission:create', 'mission:update']],
)]
class Mission
{
    #[Groups(['mission:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    /**
     * @var Collection<int, Load>
     */
    #[Groups(['mission:read'])]
    #[ORM\OneToMany(targetEntity: Load::class, mappedBy: 'mission')]
    private Collection $loads;

    #[Assert\NotBlank(message: 'Mission title is required.')]
    #[Assert\Length(
        min: 3,
        max: 255,
        minMessage: 'Mission title must be at least {{ limit }} characters long.',
        maxMessage: 'Mission title cannot be longer than {{ limit }} characters.'
    )]
    #[Assert\Regex(
        pattern: '/^[a-zA-Z0-9\s\-\.\,\:\/\(\)]+$/',
        message: 'Mission title can only contain letters, numbers, spaces, hyphens, dots, commas, colons, slashes, and parentheses.'
    )]
    #[ApiProperty(example: 'Corn Field Herbicide Application')]
    #[Groups(['mission:read', 'mission:create', 'mission:update'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $title = null;

    #[Assert\NotBlank(message: 'Mission type is required.')]
    #[Assert\Choice(
        choices: ['herbicide', 'fungicide', 'insecticide', 'fertilizer', 'seed', 'other'],
        message: 'Mission type must be one of: herbicide, fungicide, insecticide, fertilizer, seed, or other.'
    )]
    #[ApiProperty(example: 'herbicide')]
    #[Groups(['mission:read', 'mission:create', 'mission:update'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $type = null;

    #[Assert\NotNull(message: 'Total field size is required.')]
    #[Assert\Positive(message: 'Total field size must be greater than zero.')]
    #[Assert\Range(
        min: 0.1,
        max: 10000.0,
        notInRangeMessage: 'Total field size must be between {{ min }} and {{ max }} hectares.'
    )]
    #[ApiProperty(example: 150.5)]
    #[Groups(['mission:read', 'mission:create', 'mission:update'])]
    #[ORM\Column]
    private ?float $fieldSizeTotal = null;

    #[Assert\NotNull(message: 'Sprayable field size is required.')]
    #[Assert\Positive(message: 'Sprayable field size must be greater than zero.')]
    #[Assert\Range(
        min: 0.1,
        max: 10000.0,
        notInRangeMessage: 'Sprayable field size must be between {{ min }} and {{ max }} hectares.'
    )]
    #[Assert\Expression(
        "this.getFieldSizeSprayable() <= this.getFieldSizeTotal()",
        message: 'Sprayable field size cannot be larger than total field size.'
    )]
    #[ApiProperty(example: 145.0)]
    #[Groups(['mission:read', 'mission:create', 'mission:update'])]
    #[ORM\Column]
    private ?float $fieldSizeSprayable = null;

    #[Assert\NotBlank(message: 'Location is required.')]
    #[Assert\Length(
        min: 3,
        max: 255,
        minMessage: 'Location must be at least {{ limit }} characters long.',
        maxMessage: 'Location cannot be longer than {{ limit }} characters.'
    )]
    #[Assert\Regex(
        pattern: '/^[a-zA-Z0-9\s\-\.\,\:\/\(\)]+$/',
        message: 'Location can only contain letters, numbers, spaces, hyphens, dots, commas, colons, slashes, and parentheses.'
    )]
    #[ApiProperty(example: 'Farm Road 123, GPS: 40.7128° N, 74.0060° W')]
    #[Groups(['mission:read', 'mission:create', 'mission:update'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $location = null;

    #[Groups(['mission:read'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[Groups(['mission:read'])]
    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[Assert\GreaterThan(
        'today',
        message: 'Scheduled date must be in the future.'
    )]
    #[ApiProperty(example: '2024-06-15T08:00:00+00:00')]
    #[Groups(['mission:read', 'mission:create', 'mission:update'])]
    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $scheduledAt = null;

    #[Assert\NotBlank(message: 'Mission status is required.')]
    #[Assert\Choice(
        choices: ['planned', 'scheduled', 'in_progress', 'completed', 'cancelled', 'on_hold'],
        message: 'Mission status must be one of: planned, scheduled, in_progress, completed, cancelled, or on_hold.'
    )]
    #[ApiProperty(example: 'scheduled')]
    #[Groups(['mission:read', 'mission:create', 'mission:update'])]
    #[ORM\Column(length: 255)]
    private ?string $status = null;

    #[Assert\NotNull(message: 'Pilot is required.')]
    #[Groups(['mission:read', 'mission:create', 'mission:update'])]
    #[ORM\ManyToOne(inversedBy: 'missions')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Pilot $pilot = null;

    /**
     * @var Collection<int, Aircraft>
     */
    #[Assert\Count(
        min: 1,
        minMessage: 'At least one aircraft must be assigned to the mission.'
    )]
    #[Groups(['mission:read', 'mission:create', 'mission:update'])]
    #[ORM\ManyToMany(targetEntity: Aircraft::class, inversedBy: 'missions')]
    private Collection $aircraft;

    #[Assert\NotNull(message: 'Customer is required.')]
    #[Groups(['mission:read', 'mission:create', 'mission:update'])]
    #[ORM\ManyToOne(inversedBy: 'missions')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Customer $customer = null;

    #[Assert\NotNull(message: 'Base is required.')]
    #[Groups(['mission:read', 'mission:create', 'mission:update'])]
    #[ORM\ManyToOne(inversedBy: 'missions')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Base $base = null;

    public function __construct()
    {
        $this->loads = new ArrayCollection();
        $this->aircraft = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
        $this->status = 'planned';
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Load>
     */
    public function getLoads(): Collection
    {
        return $this->loads;
    }

    public function addLoad(Load $load): static
    {
        if (!$this->loads->contains($load)) {
            $this->loads->add($load);
            $load->setMission($this);
        }

        return $this;
    }

    public function removeLoad(Load $load): static
    {
        if ($this->loads->removeElement($load)) {
            // set the owning side to null (unless already changed)
            if ($load->getMission() === $this) {
                $load->setMission(null);
            }
        }

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getFieldSizeTotal(): ?float
    {
        return $this->fieldSizeTotal;
    }

    public function setFieldSizeTotal(float $fieldSizeTotal): static
    {
        $this->fieldSizeTotal = $fieldSizeTotal;

        return $this;
    }

    public function getFieldSizeSprayable(): ?float
    {
        return $this->fieldSizeSprayable;
    }

    public function setFieldSizeSprayable(float $fieldSizeSprayable): static
    {
        $this->fieldSizeSprayable = $fieldSizeSprayable;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(?string $location): static
    {
        $this->location = $location;

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

    public function getScheduledAt(): ?\DateTimeImmutable
    {
        return $this->scheduledAt;
    }

    public function setScheduledAt(?\DateTimeImmutable $scheduledAt): static
    {
        $this->scheduledAt = $scheduledAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getPilot(): ?Pilot
    {
        return $this->pilot;
    }

    public function setPilot(?Pilot $pilot): static
    {
        $this->pilot = $pilot;

        return $this;
    }

    /**
     * @return Collection<int, Aircraft>
     */
    public function getAircraft(): Collection
    {
        return $this->aircraft;
    }

    public function addAircraft(Aircraft $aircraft): static
    {
        if (!$this->aircraft->contains($aircraft)) {
            $this->aircraft->add($aircraft);
        }

        return $this;
    }

    public function removeAircraft(Aircraft $aircraft): static
    {
        $this->aircraft->removeElement($aircraft);

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): static
    {
        $this->customer = $customer;

        return $this;
    }

    public function getBase(): ?Base
    {
        return $this->base;
    }

    public function setBase(?Base $base): static
    {
        $this->base = $base;

        return $this;
    }
}
