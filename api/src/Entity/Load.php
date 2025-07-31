<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\LoadRepository;
use App\Service\UnitConversionService;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\ApiProperty;

#[ORM\Entity(repositoryClass: LoadRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(validationContext: ['groups' => ['Default', 'load:create']], security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_PILOT') or is_granted('ROLE_LOADER')"),
        new Get(),
        new Put(validationContext: ['groups' => ['Default', 'load:update']], security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_PILOT') or is_granted('ROLE_LOADER')"),
        new Patch(validationContext: ['groups' => ['Default', 'load:update']], security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_PILOT') or is_granted('ROLE_LOADER')"),
        new Delete(security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_PILOT') or is_granted('ROLE_LOADER')"),
    ],
    normalizationContext: ['groups' => ['load:read']],
    denormalizationContext: ['groups' => ['load:create', 'load:update']],
)]
class Load
{
    #[Groups(['load:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\NotNull(message: 'Load number is required.')]
    #[Assert\Positive(message: 'Load number must be greater than zero.')]
    #[Assert\Range(
        min: 1,
        max: 999999,
        notInRangeMessage: 'Load number must be between {{ min }} and {{ max }}.'
    )]
    #[ApiProperty(example: 1001)]
    #[Groups(['load:read', 'load:create', 'load:update'])]
    #[ORM\Column]
    private ?int $loadNumber = null;

    // Chemical amount in liters (primary storage unit)
    #[Assert\NotNull(message: 'Chemical amount is required.')]
    #[Assert\Positive(message: 'Chemical amount must be greater than zero.')]
    #[Assert\Range(
        min: 0.1,
        max: 1000.0,
        notInRangeMessage: 'Chemical amount must be between {{ min }} and {{ max }} liters.'
    )]
    #[ApiProperty(example: 25.5, description: 'Chemical amount in liters (primary storage unit)')]
    #[Groups(['load:read', 'load:create', 'load:update'])]
    #[ORM\Column]
    private ?float $chemicalAmount = null;

    // Chemical amount in gallons (for input/display)
    #[ApiProperty(example: 6.7, description: 'Chemical amount in gallons (will be converted to liters for storage)')]
    #[Groups(['load:create', 'load:update'])]
    private ?float $chemicalAmountGal = null;

    // Water amount in liters (primary storage unit)
    #[Assert\NotNull(message: 'Water amount is required.')]
    #[Assert\Positive(message: 'Water amount must be greater than zero.')]
    #[Assert\Range(
        min: 0.1,
        max: 5000.0,
        notInRangeMessage: 'Water amount must be between {{ min }} and {{ max }} liters.'
    )]
    #[ApiProperty(example: 500.0, description: 'Water amount in liters (primary storage unit)')]
    #[Groups(['load:read', 'load:create', 'load:update'])]
    #[ORM\Column]
    private ?float $waterAmount = null;

    // Water amount in gallons (for input/display)
    #[ApiProperty(example: 132.1, description: 'Water amount in gallons (will be converted to liters for storage)')]
    #[Groups(['load:create', 'load:update'])]
    private ?float $waterAmountGal = null;

    #[Assert\NotNull(message: 'Loader is required.')]
    #[Groups(['load:read', 'load:create', 'load:update'])]
    #[ORM\ManyToOne(inversedBy: 'loads')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Loader $loader = null;

    #[Assert\NotNull(message: 'Chemical is required.')]
    #[Groups(['load:read', 'load:create', 'load:update'])]
    #[ORM\ManyToOne(inversedBy: 'loads')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Chemical $chemical = null;

    #[Assert\NotNull(message: 'Mission is required.')]
    #[Groups(['load:read', 'load:create', 'load:update'])]
    #[ORM\ManyToOne(inversedBy: 'loads')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Mission $mission = null;

    #[Assert\NotBlank(message: 'Load status is required.')]
    #[Assert\Choice(
        choices: ['preparing', 'ready', 'loading', 'loaded', 'in_transit', 'spraying', 'completed', 'cancelled'],
        message: 'Load status must be one of: preparing, ready, loading, loaded, in_transit, spraying, completed, or cancelled.'
    )]
    #[ApiProperty(example: 'ready')]
    #[Groups(['load:read', 'load:create', 'load:update'])]
    #[ORM\Column(length: 255)]
    private ?string $status = null;

    public function __construct()
    {
        $this->status = 'preparing';
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLoadNumber(): ?int
    {
        return $this->loadNumber;
    }

    public function setLoadNumber(int $loadNumber): static
    {
        $this->loadNumber = $loadNumber;

        return $this;
    }

    public function getChemicalAmount(): ?float
    {
        return $this->chemicalAmount;
    }

    public function setChemicalAmount(float $chemicalAmount): static
    {
        $this->chemicalAmount = $chemicalAmount;

        return $this;
    }

    public function getChemicalAmountGal(): ?float
    {
        if ($this->chemicalAmount === null) {
            return null;
        }
        
        $unitConverter = new UnitConversionService();
        return $unitConverter->litersToGallons($this->chemicalAmount);
    }

    public function setChemicalAmountGal(?float $chemicalAmountGal): static
    {
        if ($chemicalAmountGal !== null) {
            $unitConverter = new UnitConversionService();
            $this->chemicalAmount = $unitConverter->gallonsToLiters($chemicalAmountGal);
        }

        return $this;
    }

    public function getWaterAmount(): ?float
    {
        return $this->waterAmount;
    }

    public function setWaterAmount(float $waterAmount): static
    {
        $this->waterAmount = $waterAmount;

        return $this;
    }

    public function getWaterAmountGal(): ?float
    {
        if ($this->waterAmount === null) {
            return null;
        }
        
        $unitConverter = new UnitConversionService();
        return $unitConverter->litersToGallons($this->waterAmount);
    }

    public function setWaterAmountGal(?float $waterAmountGal): static
    {
        if ($waterAmountGal !== null) {
            $unitConverter = new UnitConversionService();
            $this->waterAmount = $unitConverter->gallonsToLiters($waterAmountGal);
        }

        return $this;
    }

    public function getLoader(): ?Loader
    {
        return $this->loader;
    }

    public function setLoader(?Loader $loader): static
    {
        $this->loader = $loader;

        return $this;
    }

    public function getChemical(): ?Chemical
    {
        return $this->chemical;
    }

    public function setChemical(?Chemical $chemical): static
    {
        $this->chemical = $chemical;

        return $this;
    }

    public function getMission(): ?Mission
    {
        return $this->mission;
    }

    public function setMission(?Mission $mission): static
    {
        $this->mission = $mission;

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
}
