<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\ChemicalRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\ApiProperty;

#[ORM\Entity(repositoryClass: ChemicalRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(validationContext: ['groups' => ['Default', 'chemical:create']], security: "is_granted('ROLE_MANAGER')"),
        new Get(),
        new Put(validationContext: ['groups' => ['Default', 'chemical:update']], security: "is_granted('ROLE_MANAGER')"),
        new Patch(validationContext: ['groups' => ['Default', 'chemical:update']], security: "is_granted('ROLE_MANAGER')"),
        new Delete(security: "is_granted('ROLE_MANAGER')"),
    ],
    normalizationContext: ['groups' => ['chemical:read']],
    denormalizationContext: ['groups' => ['chemical:create', 'chemical:update']],
)]
#[UniqueEntity('name', message: 'A chemical with this name already exists.')]
class Chemical
{
    #[Groups(['chemical:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\NotBlank(message: 'Chemical name is required.')]
    #[Assert\Length(
        min: 2,
        max: 255,
        minMessage: 'Chemical name must be at least {{ limit }} characters long.',
        maxMessage: 'Chemical name cannot be longer than {{ limit }} characters.'
    )]
    #[Assert\Regex(
        pattern: '/^[a-zA-Z0-9\s\-\.\,\&\'\(\)\/]+$/',
        message: 'Chemical name can only contain letters, numbers, spaces, hyphens, dots, commas, ampersands, apostrophes, parentheses, and forward slashes.'
    )]
    #[ApiProperty(example: 'Roundup Ready (Glyphosate 41%)')]
    #[Groups(['chemical:read', 'chemical:create', 'chemical:update'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Assert\NotNull(message: 'Application rate is required.')]
    #[Assert\Positive(message: 'Application rate must be greater than zero.')]
    #[Assert\Range(
        min: 0.01,
        max: 100.0,
        notInRangeMessage: 'Application rate must be between {{ min }} and {{ max }} L/ha.'
    )]
    #[ApiProperty(example: 2.5)]
    #[Groups(['chemical:read', 'chemical:create', 'chemical:update'])]
    #[ORM\Column]
    private ?float $applicationRate = null;

    /**
     * @var Collection<int, Load>
     */
    #[Groups(['chemical:read'])]
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
