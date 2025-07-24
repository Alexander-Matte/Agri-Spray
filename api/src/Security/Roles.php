<?php

// src/Security/Roles.php
namespace App\Security;

final class Roles
{
    public const USER = 'ROLE_USER';
    public const LOADER = 'ROLE_LOADER';
    public const PILOT = 'ROLE_PILOT';
    public const MANAGER = 'ROLE_MANAGER';

    public static function all(): array
    {
        return [
            self::USER,
            self::LOADER,
            self::PILOT,
            self::MANAGER,
        ];
    }
}
