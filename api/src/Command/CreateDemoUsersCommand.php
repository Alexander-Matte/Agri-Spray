<?php

namespace App\Command;

use App\Entity\User;
use App\Security\Roles;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:create-demo-users',
    description: 'Creates demo users for testing the application'
)]
class CreateDemoUsersCommand extends Command
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

        $io->title('Creating Demo Users');

        $demoUsers = [
            [
                'email' => 'demo-manager@agri-spray.com',
                'password' => 'demo123',
                'roles' => ['ROLE_DEMO_MANAGER']
            ],
            [
                'email' => 'demo-pilot@agri-spray.com',
                'password' => 'demo123',
                'roles' => ['ROLE_DEMO_PILOT']
            ],
            [
                'email' => 'demo-loader@agri-spray.com',
                'password' => 'demo123',
                'roles' => ['ROLE_DEMO_LOADER']
            ]
        ];

        $createdCount = 0;

        foreach ($demoUsers as $userData) {
            // Check if user already exists
            $existingUser = $this->entityManager->getRepository(User::class)
                ->findOneBy(['email' => $userData['email']]);

            if ($existingUser) {
                $io->note("User {$userData['email']} already exists, skipping...");
                continue;
            }

            // Create new user
            $user = new User();
            $user->setEmail($userData['email']);
            $user->setRoles($userData['roles']);

            // Hash password
            $hashedPassword = $this->passwordHasher->hashPassword($user, $userData['password']);
            $user->setPassword($hashedPassword);

            // Persist user
            $this->entityManager->persist($user);
            $createdCount++;

            $io->text("Created user: {$userData['email']} with roles: " . implode(', ', $userData['roles']));
        }

        // Flush all changes
        $this->entityManager->flush();

        $io->success("Successfully created {$createdCount} demo users!");

        $io->section('Demo User Credentials');
        $io->table(
            ['Email', 'Password', 'Role'],
            [
                ['demo-manager@agri-spray.com', 'demo123', 'Demo Manager'],
                ['demo-pilot@agri-spray.com', 'demo123', 'Demo Pilot'],
                ['demo-loader@agri-spray.com', 'demo123', 'Demo Loader']
            ]
        );

        return Command::SUCCESS;
    }
} 