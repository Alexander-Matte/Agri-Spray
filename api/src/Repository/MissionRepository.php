<?php

namespace App\Repository;

use App\Entity\Mission;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Mission>
 *
 * @method Mission|null find($id, $lockMode = null, $lockVersion = null)
 * @method Mission|null findOneBy(array $criteria, array $orderBy = null)
 * @method Mission[]    findAll()
 * @method Mission[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MissionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Mission::class);
    }

    public function save(Mission $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Mission $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * Get total area sprayed (completed missions only)
     */
    public function getTotalAreaSprayed(): float
    {
        $qb = $this->createQueryBuilder('m')
            ->select('SUM(m.fieldSizeSprayable) as totalArea')
            ->where('m.status = :status')
            ->setParameter('status', 'completed');

        $result = $qb->getQuery()->getSingleScalarResult();
        
        return $result ?? 0.0;
    }

    /**
     * Get average application rate across all missions
     */
    public function getAverageApplicationRate(): float
    {
        $qb = $this->createQueryBuilder('m')
            ->select('AVG(m.fieldSizeSprayable) as avgArea')
            ->where('m.status = :status')
            ->andWhere('m.fieldSizeSprayable > 0')
            ->setParameter('status', 'completed');

        $result = $qb->getQuery()->getSingleScalarResult();
        
        return $result ?? 0.0;
    }

    /**
     * Get missions by date range
     */
    public function findByDateRange(\DateTime $startDate, \DateTime $endDate): array
    {
        return $this->createQueryBuilder('m')
            ->where('m.scheduledAt BETWEEN :startDate AND :endDate')
            ->setParameter('startDate', $startDate)
            ->setParameter('endDate', $endDate)
            ->orderBy('m.scheduledAt', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Get missions by pilot
     */
    public function findByPilot(int $pilotId): array
    {
        return $this->createQueryBuilder('m')
            ->where('m.pilot = :pilotId')
            ->setParameter('pilotId', $pilotId)
            ->orderBy('m.scheduledAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Get missions by customer
     */
    public function findByCustomer(int $customerId): array
    {
        return $this->createQueryBuilder('m')
            ->where('m.customer = :customerId')
            ->setParameter('customerId', $customerId)
            ->orderBy('m.scheduledAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

//    /**
//     * @return Mission[] Returns an array of Mission objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('m.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Mission
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
