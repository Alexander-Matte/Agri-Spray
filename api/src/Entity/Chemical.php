<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ChemicalRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ChemicalRepository::class)]
#[ApiResource]
class Chemical
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column]
    private ?float $applicationRate = null;

    /**
     * @var Collection<int, Load>
     */
    #[ORM\OneToMany(targetEntity: Load::class, mappedBy: 'chemical')]
    private Collection $loads;

    public function __construct()
    {
        $this->loads = new ArrayCollection();
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

    public function getApplicationRate(): ?float
    {
        return $this->applicationRate;
    }

    public function setApplicationRate(float $applicationRate): static
    {
        $this->applicationRate = $applicationRate;

        return $this;
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
            $load->setChemical($this);
        }

        return $this;
    }

    public function removeLoad(Load $load): static
    {
        if ($this->loads->removeElement($load)) {
            // set the owning side to null (unless already changed)
            if ($load->getChemical() === $this) {
                $load->setChemical(null);
            }
        }

        return $this;
    }
}
