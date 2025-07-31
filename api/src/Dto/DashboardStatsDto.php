<?php

namespace App\Dto;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use App\State\DashboardStatsProvider;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\ApiProperty;

#[ApiResource(
    operations: [
        new Get(
            uriTemplate: '/dashboard-stats',
            security: "is_granted('ROLE_MANAGER')",
            provider: DashboardStatsProvider::class,
            openapiContext: [
                'summary' => 'Get dashboard statistics',
                'description' => 'Retrieve aggregated statistics for the admin dashboard',
                'tags' => ['Dashboard'],
                'responses' => [
                    '200' => [
                        'description' => 'Dashboard statistics retrieved successfully',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'totalMissions' => ['type' => 'integer', 'example' => 25],
                                        'activeMissions' => ['type' => 'integer', 'example' => 8],
                                        'completedMissions' => ['type' => 'integer', 'example' => 15],
                                        'totalLoads' => ['type' => 'integer', 'example' => 150],
                                        'totalAreaSprayed' => ['type' => 'number', 'format' => 'float', 'example' => 2500.5],
                                        'totalChemicalUsed' => ['type' => 'number', 'format' => 'float', 'example' => 1250.75],
                                        'totalWaterUsed' => ['type' => 'number', 'format' => 'float', 'example' => 25000.0],
                                        'averageApplicationRate' => ['type' => 'number', 'format' => 'float', 'example' => 95.5],
                                        'lastUpdated' => ['type' => 'string', 'format' => 'date', 'example' => '2024-03-15']
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ),
    ],
    normalizationContext: ['groups' => ['dashboard_stats:read']],
)]
class DashboardStatsDto
{
    #[ApiProperty(example: 25)]
    #[Groups(['dashboard_stats:read'])]
    public ?int $totalMissions = null;

    #[ApiProperty(example: 8)]
    #[Groups(['dashboard_stats:read'])]
    public ?int $activeMissions = null;

    #[ApiProperty(example: 15)]
    #[Groups(['dashboard_stats:read'])]
    public ?int $completedMissions = null;

    #[ApiProperty(example: 2)]
    #[Groups(['dashboard_stats:read'])]
    public ?int $cancelledMissions = null;

    #[ApiProperty(example: 150)]
    #[Groups(['dashboard_stats:read'])]
    public ?int $totalLoads = null;

    #[ApiProperty(example: 45)]
    #[Groups(['dashboard_stats:read'])]
    public ?int $pendingLoads = null;

    #[ApiProperty(example: 12)]
    #[Groups(['dashboard_stats:read'])]
    public ?int $totalPilots = null;

    #[ApiProperty(example: 8)]
    #[Groups(['dashboard_stats:read'])]
    public ?int $activePilots = null;

    #[ApiProperty(example: 6)]
    #[Groups(['dashboard_stats:read'])]
    public ?int $totalLoaders = null;

    #[ApiProperty(example: 20)]
    #[Groups(['dashboard_stats:read'])]
    public ?int $totalCustomers = null;

    #[ApiProperty(example: 5)]
    #[Groups(['dashboard_stats:read'])]
    public ?int $totalAircraft = null;

    #[ApiProperty(example: 4)]
    #[Groups(['dashboard_stats:read'])]
    public ?int $availableAircraft = null;

    #[ApiProperty(example: 15)]
    #[Groups(['dashboard_stats:read'])]
    public ?int $totalChemicals = null;

    #[ApiProperty(example: 2500.5)]
    #[Groups(['dashboard_stats:read'])]
    public ?float $totalAreaSprayed = null;

    #[ApiProperty(example: 1250.75)]
    #[Groups(['dashboard_stats:read'])]
    public ?float $totalChemicalUsed = null;

    #[ApiProperty(example: 25000.0)]
    #[Groups(['dashboard_stats:read'])]
    public ?float $totalWaterUsed = null;

    #[ApiProperty(example: 95.5)]
    #[Groups(['dashboard_stats:read'])]
    public ?float $averageApplicationRate = null;

    #[ApiProperty(example: '2024-03-15')]
    #[Groups(['dashboard_stats:read'])]
    public ?string $lastUpdated = null;

    public function __construct(
        ?int $totalMissions = null,
        ?int $activeMissions = null,
        ?int $completedMissions = null,
        ?int $cancelledMissions = null,
        ?int $totalLoads = null,
        ?int $pendingLoads = null,
        ?int $totalPilots = null,
        ?int $activePilots = null,
        ?int $totalLoaders = null,
        ?int $totalCustomers = null,
        ?int $totalAircraft = null,
        ?int $availableAircraft = null,
        ?int $totalChemicals = null,
        ?float $totalAreaSprayed = null,
        ?float $totalChemicalUsed = null,
        ?float $totalWaterUsed = null,
        ?float $averageApplicationRate = null,
        ?string $lastUpdated = null
    ) {
        $this->totalMissions = $totalMissions;
        $this->activeMissions = $activeMissions;
        $this->completedMissions = $completedMissions;
        $this->cancelledMissions = $cancelledMissions;
        $this->totalLoads = $totalLoads;
        $this->pendingLoads = $pendingLoads;
        $this->totalPilots = $totalPilots;
        $this->activePilots = $activePilots;
        $this->totalLoaders = $totalLoaders;
        $this->totalCustomers = $totalCustomers;
        $this->totalAircraft = $totalAircraft;
        $this->availableAircraft = $availableAircraft;
        $this->totalChemicals = $totalChemicals;
        $this->totalAreaSprayed = $totalAreaSprayed;
        $this->totalChemicalUsed = $totalChemicalUsed;
        $this->totalWaterUsed = $totalWaterUsed;
        $this->averageApplicationRate = $averageApplicationRate;
        $this->lastUpdated = $lastUpdated;
    }
} 