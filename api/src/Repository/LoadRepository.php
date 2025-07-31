<?php

namespace App\Repository;

use App\Entity\Load;
use App\Entity\Mission;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Load>
 *
 * @method Load|null find($id, $lockMode = null, $lockVersion = null)
 * @method Load|null findOneBy(array $criteria, array $orderBy = null)
 * @method Load[]    findAll()
 * @method Load[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LoadRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Load::class);
    }

    public function save(Load $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Load $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * Get total chemical amount used across all loads
     */
    public function getTotalChemicalUsed(): float
    {
        $qb = $this->createQueryBuilder('l')
            ->select('SUM(l.chemicalAmount) as totalChemical')
            ->where('l.status IN (:completedStatuses)')
            ->setParameter('completedStatuses', ['completed', 'spraying']);

        $result = $qb->getQuery()->getSingleScalarResult();
        
        return $result ?? 0.0;
    }

    /**
     * Get total water amount used across all loads
     */
    public function getTotalWaterUsed(): float
    {
        $qb = $this->createQueryBuilder('l')
            ->select('SUM(l.waterAmount) as totalWater')
            ->where('l.status IN (:completedStatuses)')
            ->setParameter('completedStatuses', ['completed', 'spraying']);

        $result = $qb->getQuery()->getSingleScalarResult();
        
        return $result ?? 0.0;
    }

    /**
     * Get total chemical amount for a specific mission
     */
    public function getTotalChemicalAmountForMission(Mission $mission): float
    {
        $qb = $this->createQueryBuilder('l')
            ->select('SUM(l.chemicalAmount) as totalChemical')
            ->where('l.mission = :mission')
            ->andWhere('l.status IN (:completedStatuses)')
            ->setParameter('mission', $mission)
            ->setParameter('completedStatuses', ['completed', 'spraying']);

        $result = $qb->getQuery()->getSingleScalarResult();
        
        return $result ?? 0.0;
    }

    /**
     * Get total water amount for a specific mission
     */
    public function getTotalWaterAmountForMission(Mission $mission): float
    {
        $qb = $this->createQueryBuilder('l')
            ->select('SUM(l.waterAmount) as totalWater')
            ->where('l.mission = :mission')
            ->andWhere('l.status IN (:completedStatuses)')
            ->setParameter('mission', $mission)
            ->setParameter('completedStatuses', ['completed', 'spraying']);

        $result = $qb->getQuery()->getSingleScalarResult();
        
        return $result ?? 0.0;
    }

    /**
     * Get loads by status
     */
    public function findByStatus(string $status): array
    {
        return $this->createQueryBuilder('l')
            ->where('l.status = :status')
            ->setParameter('status', $status)
            ->orderBy('l.loadNumber', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Get loads by loader
     */
    public function findByLoader(int $loaderId): array
    {
        return $this->createQueryBuilder('l')
            ->where('l.loader = :loaderId')
            ->setParameter('loaderId', $loaderId)
            ->orderBy('l.loadNumber', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Get loads by chemical
     */
    public function findByChemical(int $chemicalId): array
    {
        return $this->createQueryBuilder('l')
            ->where('l.chemical = :chemicalId')
            ->setParameter('chemicalId', $chemicalId)
            ->orderBy('l.loadNumber', 'ASC')
            ->getQuery()
            ->getResult();
    }

//    /**
//     * @return Load[] Returns an array of Load objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('l')
//            ->andWhere('l.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('l.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Load
//    {
//        return $this->createQueryBuilder('l')
//            ->andWhere('l.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
