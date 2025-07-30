<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\AircraftRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: AircraftRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(validationContext: ['groups' => ['Default', 'aircraft:create']], security: "is_granted('ROLE_MANAGER')"),
        new Get(),
        new Put(validationContext: ['groups' => ['Default', 'aircraft:update']], security: "is_granted('ROLE_MANAGER')"),
        new Patch(validationContext: ['groups' => ['Default', 'aircraft:update']], security: "is_granted('ROLE_MANAGER')"),
        new Delete(security: "is_granted('ROLE_MANAGER')"),
    ],
    normalizationContext: ['groups' => ['aircraft:read']],
    denormalizationContext: ['groups' => ['aircraft:create', 'aircraft:update']],
)]
#[UniqueEntity('registrationNumber', message: 'An aircraft with this registration number already exists.')]
class Aircraft
{
    #[Groups(['aircraft:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\NotBlank(message: 'Aircraft registration number is required.')]
    #[Assert\Length(
        min: 3,
        max: 10,
        minMessage: 'Registration number must be at least {{ limit }} characters long.',
        maxMessage: 'Registration number cannot be longer than {{ limit }} characters.'
    )]
    #[Assert\Regex(
        pattern: '/^[A-Z0-9\-]+$/',
        message: 'Registration number can only contain uppercase letters, numbers, and hyphens.'
    )]
    #[Groups(['aircraft:read', 'aircraft:create', 'aircraft:update'])]
    #[ORM\Column(length: 255)]
    private ?string $registrationNumber = null;

    #[Assert\NotBlank(message: 'Aircraft model is required.')]
    #[Assert\Length(
        min: 2,
        max: 100,
        minMessage: 'Aircraft model must be at least {{ limit }} characters long.',
        maxMessage: 'Aircraft model cannot be longer than {{ limit }} characters.'
    )]
    #[Assert\Regex(
        pattern: '/^[a-zA-Z0-9\s\-\.]+$/',
        message: 'Aircraft model can only contain letters, numbers, spaces, hyphens, and dots.'
    )]
    #[Groups(['aircraft:read', 'aircraft:create', 'aircraft:update'])]
    #[ORM\Column(length: 255)]
    private ?string $model = null;

    #[Assert\NotNull(message: 'Hopper capacity in gallons is required.')]
    #[Assert\Positive(message: 'Hopper capacity in gallons must be greater than zero.')]
    #[Assert\Range(
        min: 50,
        max: 5000,
        notInRangeMessage: 'Hopper capacity must be between {{ min }} and {{ max }} gallons.'
    )]
    #[Groups(['aircraft:read', 'aircraft:create', 'aircraft:update'])]
    #[ORM\Column]
    private ?int $hopperCapacityGal = null;

    #[Assert\NotNull(message: 'Hopper capacity in liters is required.')]
    #[Assert\Positive(message: 'Hopper capacity in liters must be greater than zero.')]
    #[Assert\Range(
        min: 189,
        max: 18927,
        notInRangeMessage: 'Hopper capacity must be between {{ min }} and {{ max }} liters.'
    )]
    #[Assert\Expression(
        "this.getHopperCapacityLt() >= this.getHopperCapacityGal() * 3.785",
        message: 'Hopper capacity in liters must be at least 3.785 times the capacity in gallons.'
    )]
    #[Groups(['aircraft:read', 'aircraft:create', 'aircraft:update'])]
    #[ORM\Column]
    private ?int $hopperCapacityLt = null;

    /**
     * @var Collection<int, Mission>
     */
    #[Groups(['aircraft:read'])]
    #[ORM\ManyToMany(targetEntity: Mission::class, mappedBy: 'aircraft')]
    private Collection $missions;

    public function __construct()
    {
        $this->missions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRegistrationNumber(): ?string
    {
        return $this->registrationNumber;
    }

    public function setRegistrationNumber(string $registrationNumber): static
    {
        $this->registrationNumber = $registrationNumber;

        return $this;
    }

    public function getModel(): ?string
    {
        return $this->model;
    }

    public function setModel(string $model): static
    {
        $this->model = $model;

        return $this;
    }

    public function getHopperCapacityGal(): ?int
    {
        return $this->hopperCapacityGal;
    }

    public function setHopperCapacityGal(int $hopperCapacityGal): static
    {
        $this->hopperCapacityGal = $hopperCapacityGal;

        return $this;
    }

    public function getHopperCapacityLt(): ?int
    {
        return $this->hopperCapacityLt;
    }

    public function setHopperCapacityLt(int $hopperCapacityLt): static
    {
        $this->hopperCapacityLt = $hopperCapacityLt;

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
            $mission->addAircraft($this);
        }

        return $this;
    }

    public function removeMission(Mission $mission): static
    {
        if ($this->missions->removeElement($mission)) {
            $mission->removeAircraft($this);
        }

        return $this;
    }
}
