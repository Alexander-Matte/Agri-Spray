<?php

namespace App\State;

use ApiPlatform\Metadata\DeleteOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\User;
use App\Security\Roles;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

/**
 * @implements ProcessorInterface<User, User|void>
 */
final class UserProcessor implements ProcessorInterface
{
    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.persist_processor')]
        private ProcessorInterface $persistProcessor,

        #[Autowire(service: 'api_platform.doctrine.orm.state.remove_processor')]
        private ProcessorInterface $removeProcessor,

        private UserPasswordHasherInterface $passwordHasher,
        private AuthorizationCheckerInterface $authorizationChecker,
    ) {}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        if (!$data instanceof User) {
            return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
        }

        if ($operation instanceof DeleteOperationInterface) {
            return $this->removeProcessor->process($data, $operation, $uriVariables, $context);
        }

        // 🔐 Password hashing
        if ($data->getPlainPassword()) {
            $data->setPassword(
                $this->passwordHasher->hashPassword($data, $data->getPlainPassword())
            );
            $data->eraseCredentials();
        }

        // Role assignment
        $incomingRoles = $data->getRoles();

        // If no roles provided (empty or missing), assign ROLE_USER
        if (empty($incomingRoles)) {
            $data->setRoles([Roles::USER]);
        } elseif ($this->authorizationChecker->isGranted(Roles::MANAGER)) {
            // If manager is logged in and provided roles, validate them
            $data->setRoles(array_intersect($incomingRoles, Roles::all()));
        } else {
            // If not a manager but tried to set roles, override with default
            $data->setRoles([Roles::USER]);
        }


        // 💾 Persist
        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }
}
