<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\BaseRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: BaseRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(validationContext: ['groups' => ['Default', 'base:create']], security: "is_granted('ROLE_MANAGER')"),
        new Get(),
        new Put(validationContext: ['groups' => ['Default', 'base:update']], security: "is_granted('ROLE_MANAGER')"),
        new Patch(validationContext: ['groups' => ['Default', 'base:update']], security: "is_granted('ROLE_MANAGER')"),
        new Delete(security: "is_granted('ROLE_MANAGER')"),
    ],
    normalizationContext: ['groups' => ['base:read']],
    denormalizationContext: ['groups' => ['base:create', 'base:update']],
)]
#[UniqueEntity('name', message: 'A base with this name already exists.')]
class Base
{
    #[Groups(['base:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\NotBlank(message: 'Base name is required.')]
    #[Assert\Length(
        min: 2,
        max: 255,
        minMessage: 'Base name must be at least {{ limit }} characters long.',
        maxMessage: 'Base name cannot be longer than {{ limit }} characters.'
    )]
    #[Assert\Regex(
        pattern: '/^[a-zA-Z0-9\s\-\.\,\&\'\(\)]+$/',
        message: 'Base name can only contain letters, numbers, spaces, hyphens, dots, commas, ampersands, apostrophes, and parentheses.'
    )]
    #[Groups(['base:read', 'base:create', 'base:update'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Assert\NotBlank(message: 'Base location is required.')]
    #[Assert\Length(
        min: 3,
        max: 255,
        minMessage: 'Base location must be at least {{ limit }} characters long.',
        maxMessage: 'Base location cannot be longer than {{ limit }} characters.'
    )]
    #[Assert\Regex(
        pattern: '/^[a-zA-Z0-9\s\-\.\,\:\/\(\)]+$/',
        message: 'Base location can only contain letters, numbers, spaces, hyphens, dots, commas, colons, slashes, and parentheses.'
    )]
    #[Groups(['base:read', 'base:create', 'base:update'])]
    #[ORM\Column(length: 255)]
    private ?string $location = null;

    /**
     * @var Collection<int, Mission>
     */
    #[Groups(['base:read'])]
    #[ORM\OneToMany(targetEntity: Mission::class, mappedBy: 'base')]
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

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): static
    {
        $this->location = $location;

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
            $mission->setBase($this);
        }

        return $this;
    }

    public function removeMission(Mission $mission): static
    {
        if ($this->missions->removeElement($mission)) {
            // set the owning side to null (unless already changed)
            if ($mission->getBase() === $this) {
                $mission->setBase(null);
            }
        }

        return $this;
    }
}
