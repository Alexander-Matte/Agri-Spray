<?php

namespace App\State;

use App\Dto\MissionSummaryDto;
use App\Repository\MissionRepository;
use App\Repository\LoadRepository;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class MissionSummaryProvider implements ProviderInterface
{
    public function __construct(
        private MissionRepository $missionRepository,
        private LoadRepository $loadRepository
    ) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        // Check if user has required role
        if (!isset($context['security']) || 
            (!$context['security']->isGranted('ROLE_MANAGER') && !$context['security']->isGranted('ROLE_PILOT'))) {
            throw new AccessDeniedHttpException('Access denied. ROLE_MANAGER or ROLE_PILOT required.');
        }

        // Get query parameters
        $request = $context['request'] ?? null;
        $page = $request ? $request->query->getInt('page', 1) : 1;
        $limit = $request ? $request->query->getInt('limit', 10) : 10;
        $status = $request ? $request->query->get('status') : null;
        $pilotId = $request ? $request->query->get('pilot') : null;
        $customerId = $request ? $request->query->get('customer') : null;

        $criteria = [];
        if ($status) {
            $criteria['status'] = $status;
        }
        if ($pilotId) {
            $criteria['pilot'] = $pilotId;
        }
        if ($customerId) {
            $criteria['customer'] = $customerId;
        }

        $missions = $this->missionRepository->findBy($criteria, ['scheduledAt' => 'DESC'], $limit, ($page - 1) * $limit);
        
        $summaries = [];
        foreach ($missions as $mission) {
            $totalLoads = $this->loadRepository->count(['mission' => $mission]);
            $totalChemicalAmount = $this->loadRepository->getTotalChemicalAmountForMission($mission);
            $totalWaterAmount = $this->loadRepository->getTotalWaterAmountForMission($mission);
            
            $applicationRate = $mission->getFieldSizeSprayable() > 0 
                ? $totalChemicalAmount / $mission->getFieldSizeSprayable() 
                : 0;

            $summary = new MissionSummaryDto(
                $mission->getId(),
                $mission->getTitle(),
                $mission->getType(),
                $mission->getFieldSizeTotal(),
                $mission->getFieldSizeSprayable(),
                $mission->getScheduledAt(),
                $mission->getStatus(),
                $mission->getPilot()?->getName(),
                $mission->getCustomer()?->getName(),
                $mission->getAircraft()?->getRegistrationNumber(),
                $totalLoads,
                $totalChemicalAmount,
                $totalWaterAmount,
                $applicationRate
            );
            
            $summaries[] = $summary;
        }

        return $summaries;
    }
} 