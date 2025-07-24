<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\LoadRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LoadRepository::class)]
#[ApiResource]
class Load
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $loadNumber = null;

    #[ORM\Column]
    private ?float $chemicalAmount = null;

    #[ORM\Column]
    private ?float $waterAmount = null;

    #[ORM\ManyToOne(inversedBy: 'loads')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Loader $loader = null;

    #[ORM\ManyToOne(inversedBy: 'loads')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Chemical $chemical = null;

    #[ORM\ManyToOne(inversedBy: 'loads')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Mission $mission = null;

    #[ORM\Column(length: 255)]
    private ?string $status = null;

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

    public function getWaterAmount(): ?float
    {
        return $this->waterAmount;
    }

    public function setWaterAmount(float $waterAmount): static
    {
        $this->waterAmount = $waterAmount;

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
