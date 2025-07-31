<?php

namespace App\Dto;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\State\MissionSummaryProvider;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\ApiProperty;

#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/mission-summaries',
            security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_PILOT')",
            provider: MissionSummaryProvider::class,
            openapiContext: [
                'summary' => 'Get mission summaries',
                'description' => 'Retrieve filtered and aggregated mission data with load information',
                'tags' => ['Missions'],
                'parameters' => [
                    [
                        'name' => 'status',
                        'in' => 'query',
                        'description' => 'Filter by mission status',
                        'schema' => [
                            'type' => 'string',
                            'enum' => ['scheduled', 'in_progress', 'completed', 'cancelled']
                        ]
                    ],
                    [
                        'name' => 'pilot',
                        'in' => 'query',
                        'description' => 'Filter by pilot ID',
                        'schema' => ['type' => 'integer']
                    ],
                    [
                        'name' => 'customer',
                        'in' => 'query',
                        'description' => 'Filter by customer ID',
                        'schema' => ['type' => 'integer']
                    ],
                    [
                        'name' => 'page',
                        'in' => 'query',
                        'description' => 'Page number for pagination',
                        'schema' => ['type' => 'integer', 'default' => 1]
                    ],
                    [
                        'name' => 'limit',
                        'in' => 'query',
                        'description' => 'Number of items per page',
                        'schema' => ['type' => 'integer', 'default' => 10]
                    ]
                ],
                'responses' => [
                    '200' => [
                        'description' => 'Mission summaries retrieved successfully',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'array',
                                    'items' => [
                                        'type' => 'object',
                                        'properties' => [
                                            'id' => ['type' => 'integer', 'example' => 1],
                                            'title' => ['type' => 'string', 'example' => 'Spring Wheat Spraying'],
                                            'type' => ['type' => 'string', 'example' => 'herbicide'],
                                            'fieldSizeTotal' => ['type' => 'number', 'format' => 'float', 'example' => 150.5],
                                            'fieldSizeSprayable' => ['type' => 'number', 'format' => 'float', 'example' => 145.2],
                                            'scheduledAt' => ['type' => 'string', 'format' => 'date-time', 'example' => '2024-03-15T08:00:00+00:00'],
                                            'status' => ['type' => 'string', 'example' => 'scheduled'],
                                            'pilotName' => ['type' => 'string', 'example' => 'John Smith'],
                                            'customerName' => ['type' => 'string', 'example' => 'Acme Farms'],
                                            'aircraftRegistration' => ['type' => 'string', 'example' => 'N-12345'],
                                            'totalLoads' => ['type' => 'integer', 'example' => 3],
                                            'totalChemicalAmount' => ['type' => 'number', 'format' => 'float', 'example' => 75.5],
                                            'totalWaterAmount' => ['type' => 'number', 'format' => 'float', 'example' => 1500.0],
                                            'applicationRate' => ['type' => 'number', 'format' => 'float', 'example' => 2.5]
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ),
    ],
    normalizationContext: ['groups' => ['mission_summary:read']],
)]
class MissionSummaryDto
{
    #[ApiProperty(example: 1)]
    #[Groups(['mission_summary:read'])]
    public ?int $id = null;

    #[ApiProperty(example: 'Spring Wheat Spraying')]
    #[Groups(['mission_summary:read'])]
    public ?string $title = null;

    #[ApiProperty(example: 'herbicide')]
    #[Groups(['mission_summary:read'])]
    public ?string $type = null;

    #[ApiProperty(example: 150.5)]
    #[Groups(['mission_summary:read'])]
    public ?float $fieldSizeTotal = null;

    #[ApiProperty(example: 145.2)]
    #[Groups(['mission_summary:read'])]
    public ?float $fieldSizeSprayable = null;

    #[ApiProperty(example: '2024-03-15T08:00:00+00:00')]
    #[Groups(['mission_summary:read'])]
    public ?\DateTimeInterface $scheduledAt = null;

    #[ApiProperty(example: 'scheduled')]
    #[Groups(['mission_summary:read'])]
    public ?string $status = null;

    #[ApiProperty(example: 'John Smith')]
    #[Groups(['mission_summary:read'])]
    public ?string $pilotName = null;

    #[ApiProperty(example: 'Acme Farms')]
    #[Groups(['mission_summary:read'])]
    public ?string $customerName = null;

    #[ApiProperty(example: 'N-12345')]
    #[Groups(['mission_summary:read'])]
    public ?string $aircraftRegistration = null;

    #[ApiProperty(example: 3)]
    #[Groups(['mission_summary:read'])]
    public ?int $totalLoads = null;

    #[ApiProperty(example: 75.5)]
    #[Groups(['mission_summary:read'])]
    public ?float $totalChemicalAmount = null;

    #[ApiProperty(example: 1500.0)]
    #[Groups(['mission_summary:read'])]
    public ?float $totalWaterAmount = null;

    #[ApiProperty(example: 2.5)]
    #[Groups(['mission_summary:read'])]
    public ?float $applicationRate = null;

    public function __construct(
        ?int $id = null,
        ?string $title = null,
        ?string $type = null,
        ?float $fieldSizeTotal = null,
        ?float $fieldSizeSprayable = null,
        ?\DateTimeInterface $scheduledAt = null,
        ?string $status = null,
        ?string $pilotName = null,
        ?string $customerName = null,
        ?string $aircraftRegistration = null,
        ?int $totalLoads = null,
        ?float $totalChemicalAmount = null,
        ?float $totalWaterAmount = null,
        ?float $applicationRate = null
    ) {
        $this->id = $id;
        $this->title = $title;
        $this->type = $type;
        $this->fieldSizeTotal = $fieldSizeTotal;
        $this->fieldSizeSprayable = $fieldSizeSprayable;
        $this->scheduledAt = $scheduledAt;
        $this->status = $status;
        $this->pilotName = $pilotName;
        $this->customerName = $customerName;
        $this->aircraftRegistration = $aircraftRegistration;
        $this->totalLoads = $totalLoads;
        $this->totalChemicalAmount = $totalChemicalAmount;
        $this->totalWaterAmount = $totalWaterAmount;
        $this->applicationRate = $applicationRate;
    }
} 