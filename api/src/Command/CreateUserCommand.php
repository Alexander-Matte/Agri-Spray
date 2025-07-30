<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:create-user',
    description: 'Creates the first user with ROLE_MANAGER',
)]
class CreateUserCommand extends Command
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UserPasswordHasherInterface $passwordHasher
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        // Check if user already exists
        $existingUser = $this->entityManager->getRepository(User::class)->findOneBy(['email' => 'admin@agri-spray.com']);
        
        if ($existingUser) {
            $io->warning('User admin@agri-spray.com already exists!');
            return Command::SUCCESS;
        }

        // Create new user
        $user = new User();
        $user->setEmail('admin@agri-spray.com');
        $user->setRoles(['ROLE_MANAGER']);
        
        // Hash the password
        $hashedPassword = $this->passwordHasher->hashPassword($user, 'Admin123!');
        $user->setPassword($hashedPassword);

        // Save to database
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $io->success('User created successfully!');
        $io->text('Email: admin@agri-spray.com');
        $io->text('Password: Admin123!');
        $io->text('Role: ROLE_MANAGER');

        return Command::SUCCESS;
    }
}
