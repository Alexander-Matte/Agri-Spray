<?php

namespace App\State;

use App\Dto\DashboardStatsDto;
use App\Repository\MissionRepository;
use App\Repository\LoadRepository;
use App\Repository\PilotRepository;
use App\Repository\LoaderRepository;
use App\Repository\CustomerRepository;
use App\Repository\AircraftRepository;
use App\Repository\ChemicalRepository;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class DashboardStatsProvider implements ProviderInterface
{
    public function __construct(
        private MissionRepository $missionRepository,
        private LoadRepository $loadRepository,
        private PilotRepository $pilotRepository,
        private LoaderRepository $loaderRepository,
        private CustomerRepository $customerRepository,
        private AircraftRepository $aircraftRepository,
        private ChemicalRepository $chemicalRepository
    ) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        // Check if user has ROLE_MANAGER
        if (!isset($context['security']) || !$context['security']->isGranted('ROLE_MANAGER')) {
            throw new AccessDeniedHttpException('Access denied. ROLE_MANAGER required.');
        }

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

        return new DashboardStatsDto(
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
    }
} 