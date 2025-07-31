<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\LoaderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\ApiProperty;

#[ORM\Entity(repositoryClass: LoaderRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(validationContext: ['groups' => ['Default', 'loader:create']], security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_PILOT')"),
        new Get(),
        new Put(validationContext: ['groups' => ['Default', 'loader:update']], security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_PILOT')"),
        new Patch(validationContext: ['groups' => ['Default', 'loader:update']], security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_PILOT')"),
        new Delete(security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_PILOT')"),
    ],
    normalizationContext: ['groups' => ['loader:read']],
    denormalizationContext: ['groups' => ['loader:create', 'loader:update']],
)]
#[UniqueEntity('email', message: 'This email address is already registered for another loader.')]
class Loader
{
    #[Groups(['loader:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    /**
     * @var Collection<int, Load>
     */
    #[Groups(['loader:read'])]
    #[ORM\OneToMany(targetEntity: Load::class, mappedBy: 'loader')]
    private Collection $loads;

    #[Assert\NotBlank(message: 'Loader name is required.')]
    #[Assert\Length(
        min: 2,
        max: 255,
        minMessage: 'Loader name must be at least {{ limit }} characters long.',
        maxMessage: 'Loader name cannot be longer than {{ limit }} characters.'
    )]
    #[Assert\Regex(
        pattern: '/^[a-zA-Z\s\-\.\']+$/',
        message: 'Loader name can only contain letters, spaces, hyphens, dots, and apostrophes.'
    )]
    #[ApiProperty(example: 'Mike Johnson')]
    #[Groups(['loader:read', 'loader:create', 'loader:update'])]
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
    #[Groups(['loader:read', 'loader:create', 'loader:update'])]
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
    #[ApiProperty(example: 'mike.johnson@agri-spray.com')]
    #[Groups(['loader:read', 'loader:create', 'loader:update'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $email = null;

    public function __construct()
    {
        $this->loads = new ArrayCollection();
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
            $load->setLoader($this);
        }

        return $this;
    }

    public function removeLoad(Load $load): static
    {
        if ($this->loads->removeElement($load)) {
            // set the owning side to null (unless already changed)
            if ($load->getLoader() === $this) {
                $load->setLoader(null);
            }
        }

        return $this;
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
}
