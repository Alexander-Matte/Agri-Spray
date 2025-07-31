<?php

namespace App\Controller;

use App\Dto\DashboardStatsDto;
use App\Dto\MissionSummaryDto;
use App\Repository\MissionRepository;
use App\Repository\LoadRepository;
use App\Repository\PilotRepository;
use App\Repository\LoaderRepository;
use App\Repository\CustomerRepository;
use App\Repository\AircraftRepository;
use App\Repository\ChemicalRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use ApiPlatform\State\ProcessorInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[Route('/api')]
class DashboardController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private MissionRepository $missionRepository,
        private LoadRepository $loadRepository,
        private PilotRepository $pilotRepository,
        private LoaderRepository $loaderRepository,
        private CustomerRepository $customerRepository,
        private AircraftRepository $aircraftRepository,
        private ChemicalRepository $chemicalRepository
    ) {}

    #[Route('/dashboard-stats', name: 'dashboard_stats', methods: ['GET'])]
    #[IsGranted('ROLE_MANAGER')]
    public function getDashboardStats(): JsonResponse
    {
        // Get counts
        $totalMissions = $this->missionRepository->count([]);
        $activeMissions = $this->missionRepository->count(['status' => 'scheduled']);
        $completedMissions = $this->missionRepository->count(['status' => 'completed']);
        $cancelledMissions = $this->missionRepository->count(['status' => 'cancelled']);
        
        $totalLoads = $this->loadRepository->count([]);
        $pendingLoads = $this->loadRepository->count(['status' => 'preparing']);
        
        $totalPilots = $this->pilotRepository->count([]);
        $activePilots = $this->pilotRepository->count([]); // Assuming all pilots are active
        
        $totalLoaders = $this->loaderRepository->count([]);
        $totalCustomers = $this->customerRepository->count([]);
        $totalAircraft = $this->aircraftRepository->count([]);
        $availableAircraft = $this->aircraftRepository->count([]); // Assuming all aircraft are available
        
        $totalChemicals = $this->chemicalRepository->count([]);

        // Calculate aggregated data
        $totalAreaSprayed = $this->missionRepository->getTotalAreaSprayed();
        $totalChemicalUsed = $this->loadRepository->getTotalChemicalUsed();
        $totalWaterUsed = $this->loadRepository->getTotalWaterUsed();
        $averageApplicationRate = $this->missionRepository->getAverageApplicationRate();

        $stats = new DashboardStatsDto(
            $totalMissions,
            $activeMissions,
            $completedMissions,
            $cancelledMissions,
            $totalLoads,
            $pendingLoads,
            $totalPilots,
            $activePilots,
            $totalLoaders,
            $totalCustomers,
            $totalAircraft,
            $availableAircraft,
            $totalChemicals,
            $totalAreaSprayed,
            $totalChemicalUsed,
            $totalWaterUsed,
            $averageApplicationRate,
            date('Y-m-d')
        );

        return $this->json($stats, 200, [], ['groups' => ['dashboard_stats:read']]);
    }

    #[Route('/mission-summaries', name: 'mission_summaries', methods: ['GET'])]
    #[IsGranted('ROLE_MANAGER')]
    public function getMissionSummaries(Request $request): JsonResponse
    {
        $page = $request->query->getInt('page', 1);
        $limit = $request->query->getInt('limit', 10);
        $status = $request->query->get('status');
        $pilotId = $request->query->get('pilot');
        $customerId = $request->query->get('customer');

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

        return $this->json($summaries, 200, [], ['groups' => ['mission_summary:read']]);
    }

    #[Route('/pilot/{id}/missions', name: 'pilot_missions', methods: ['GET'])]
    #[IsGranted('ROLE_PILOT')]
    public function getPilotMissions(int $id): JsonResponse
    {
        // Ensure pilot can only see their own missions
        if (!$this->isGranted('ROLE_MANAGER') && $this->getUser()->getId() !== $id) {
            throw $this->createAccessDeniedException('You can only view your own missions.');
        }

        $missions = $this->missionRepository->findBy(['pilot' => $id], ['scheduledAt' => 'DESC']);
        
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

        return $this->json($summaries, 200, [], ['groups' => ['mission_summary:read']]);
    }
} 